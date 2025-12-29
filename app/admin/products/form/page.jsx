"use client";

import { useState, useEffect } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import {
  createNewProduct,
  updateProduct,
} from "@/lib/firestore/products/write";
import { useRouter, useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/firestore/products/read_server";

export default function page() {
  const [data, setData] = useState({});
  const [featureImage, setFeatureImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Start code for autofill form when click on edit
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getProduct({ id: id }); //import getProduct from read_server.jsx
      if (!res) {
        throw new Error("Product not found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  // End code for autofill form when click on edit

  const handleData = (key, value) => {
    setData((preData) => {
      return {
        ...(preData ?? {}),
        [key]: value,
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      setData(null); //Clear all form fields after successful submission
      setFeatureImage(null); //Clear the main image preview
      setImageList([]); //Clear any uploaded additional images
      toast.success("Product is successfully created!");
      router.push(`/admin/products`); //Redirect to product list
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      setData(null);
      setFeatureImage(null);
      setImageList([]);
      toast.success("Product successfully updated!");
      router.push(`/admin/products`);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update product");
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleUpdate();
        } else {
          handleCreate();
        }
      }}
      className="flex flex-col gap-4 p-5"
    >
      <div className="flex justify-between w-full items-center">
        <h1 className="font-semibold">
          {id ? "Update Product" : "Create New Product"}
        </h1>
        <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
          {id ? "Update" : "Create"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 flex">
          <BasicDetails data={data} handleData={handleData} />
        </div>

        <div className="flex-1 flex flex-col gap-5 h-full">
          <Images
            data={data}
            featureImage={featureImage}
            setFeatureImage={setFeatureImage}
            imageList={imageList}
            setImageList={setImageList}
          />
          <Description data={data?.description || ""} handleData={handleData} />
        </div>
      </div>
    </form>
  );
}
