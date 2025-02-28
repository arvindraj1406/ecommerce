"use client";

import { getCollection } from "@/lib/firestore/collections/read_server";
import {
  createNewCollections,
  updateCollection,
} from "@/lib/firestore/collections/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // for button disable until complete
  const { data: products } = useProducts({ pageLimit: 2000 });

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const res = await getCollection({ id: id });
      if (!res) {
        toast.error("Collection not found!");
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
      await createNewCollections({ data: data, image: image });
      toast.success("Collection added successfully!!"); // Show success toast
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
      await updateCollection({ data: data, image: image });
      toast.success("Collection updated successfully!!"); // Show success toast
      setData(null); // empty data after create
      setImage(null); //empty image after create
      router.push(`/admin/collections`); // after update, remove id form url
    } catch (error) {
      //console.log(error?.message);
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-5 w-full md:w-[400px] flex flex-col gap-3">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Collection</h1>
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
              id="collection-image"
              name="collection-imge"
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
          <label htmlFor="collection-title" className="text-gray-500 text-sm">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="collection-title"
            name="collection-title"
            placeholder="Enter Title"
            value={data?.title ?? ""} //If the left-hand operand is null or undefined, it returns the right-hand operand
            onChange={(e) => {
              handleData("title", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Sub Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="collection-sub-title"
            name="collection-sub-title"
            placeholder="Enter Sub Title"
            value={data?.subtitle ?? ""}
            onChange={(e) => {
              handleData("subtitle", e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {data?.products?.map((productId) => {
            return (
              <ProductCard
                productId={productId}
                key={productId}
                setData={setData}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Select Product<span className="text-red-500">*</span>
          </label>
          <select
            type="text"
            id="collection-sub-title"
            name="collection-sub-title"
            onChange={(e) => {
              setData((prevData) => {
                let list = [...(prevData?.products ?? [])];
                list.push(e.target.value);
                return {
                  ...prevData,
                  products: list,
                };
              });
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          >
            <option value="">Select Product</option>
            {products?.map((item) => {
              return (
                <option
                  disabled={data?.products?.includes(item?.id)}
                  value={item?.id}
                  key={item?.id}
                >
                  {item?.title}
                </option>
              );
            })}
          </select>
        </div>

        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

function ProductCard({ productId, setData }) {
  const { data: product } = useProduct({ productId: productId });
  return (
    <div className="flex gap-3 justify-between bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
      <h2>{product?.title}</h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          setData((prevData) => {
            let list = [...prevData?.products];
            list = list?.filter((item) => item != productId);
            return {
              ...prevData,
              products: list,
            };
          });
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default Form;
