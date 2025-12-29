"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ListView = () => {
  const [pageLimit, setPageLimit] = useState(3);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]); // Reset/empty pagination when pageLimit changes
  }, [pageLimit]);

  const {
    data: products,
    error,
    isLoading,
    lastSnapDoc,
    hasNextPage,
  } = useProducts({
    pageLimit: pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });

  const handleNextPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };

  const handlePrePage = () => {
    let newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

  // console.log("Products:", products);
  // console.log("Last Snapshot:", lastSnapDoc);
  // console.log(
  //   "Is Next Disabled:",
  //   isLoading || !lastSnapDoc || (products && products.length < pageLimit)
  // );

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" py-2 rounded-xl flex-1 flex flex-col gap-3 overflow-x-auto w-full">
      <table className="border-separate border-spacing-y-2 text-[14px]">
        <thead>
          <tr>
            <th className="border-y font-semibold bg-white px-3 py-2 rounded-l-lg">
              SN
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2">Image</th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Title
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Price
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Stock
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Orders
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Status
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 rounded-r-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => {
            return (
              <Row
                index={index + lastSnapDocList?.length * pageLimit}
                item={item}
                key={item?.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between text-sm">
        <Button
          isDisabled={isLoading || lastSnapDocList?.length === 0}
          onClick={handlePrePage}
          size="sm"
          variant="bordered"
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(Number(e.target.value))}
          className="px-5 rounded-xl"
          name="perpage"
          id="perpage"
        >
          <option value={1}>1 Items</option>
          <option value={2}>2 Items</option>
          <option value={3}>3 Items</option>
        </select>

        <Button
          isDisabled={isLoading || !hasNextPage}
          onClick={handleNextPage}
          size="sm"
          variant="bordered"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    setIsDeleting(true);
    try {
      await deleteProduct({ id: item?.id, public_id: item?.public_id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/products/form?id=${item?.id}`);
  };
  return (
    <tr key={item.id || index}>
      <td className="border-y bg-white px-3 py-2 rounded-1-lg text-center rounded-l-lg">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex justify-center">
          <img
            className="h-10 w-10 object-cover rounded-md"
            src={item?.featuredImageURL || "Missing Image"}
            alt={item?.title || "Image"}
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2 whitespace-nowrap">
        {item?.title}
        {item?.isFeatured && (
          <span className="bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[11px] rounded-full px-3 py-1 ml-2">
            Featured
          </span>
        )}
      </td>
      <td className="border-y bg-white px-3 py-2 whitespace-nowrap">
        {item?.saleprice < item.price && (
          <span className="text-xs text-gray-500 line-through pr-2">
            {"\u20B9"} {item?.price}
          </span>
        )}
        {"\u20B9"} {item?.saleprice}
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.stock}</td>
      <td className="border-y bg-white px-3 py-2">{item?.order ?? 0}</td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex">
          {item?.stock - (item?.order ?? 0) > 0 && (
            <div className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-md">
              Available
            </div>
          )}
          {item?.stock - (item?.order ?? 0) <= 0 && (
            <div className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-md">
              Out Of Stock
            </div>
          )}
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2 rounded-r-lg">
        <div className="flex gap-2 items-center justify-center ">
          <Button
            onClick={handleUpdate}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
export default ListView;
