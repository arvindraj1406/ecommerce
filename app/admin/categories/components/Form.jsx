"use client";

import { getCategory } from "@/lib/firestore/categories/read_server";
import {
  createNewCategory,
  updateCategory,
} from "@/lib/firestore/categories/write";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // for button disable until complete

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category not found!");
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

  // Function to update `data` state dynamically by key-value pairs.
  const handleData = (key, value) => {
    setData((preData) => {
      return {
        ...(preData ?? {}), // Ensures previous data is preserved or initializes an empty object.
        [key]: value, // Updates the specific key with the new value.
      };
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewCategory({ data: data, image: image });
      toast.success("Category added successfully!!"); // Show success toast
      setData(null); // empty data after create
      setImage(null); //empty image after create
    } catch (error) {
      //console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCategory({ data: data, image: image });
      toast.success("Category updated successfully!!"); // Show success toast
      setData(null); // empty data after create
      setImage(null); //empty image after create
      router.push(`/admin/categories`); // after update, remove id form url
    } catch (error) {
      //console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-5 w-full md:w-[400px] flex flex-col gap-3">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-2">
          <div className="">
            <label
              htmlFor="image-name"
              className="text-gray-500 w-full text-sm"
            >
              Image<span className="text-red-500">*</span>
            </label>

            <input
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setImage(e.target.files[0]); // Sets the selected image file in the `image` state if a file is chosen.
                }
              }}
              type="file"
              id="category-image"
              name="category-imge"
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          {image && (
            <div className="flex w-22">
              <img
                src={URL.createObjectURL(image)} // Creates a temporary URL to display the selected image preview.
                alt=""
                className="h-auto w-20 border-1 rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category-name"
            name="category-name"
            placeholder="Enter Name"
            value={data?.name ?? ""} //If the left-hand operand is null or undefined, it returns the right-hand operand
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Slug<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slug-name"
            name="slug-name"
            placeholder="Enter Slug"
            value={data?.slug ?? ""}
            onChange={(e) => {
              handleData("slug", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
