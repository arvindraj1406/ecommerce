"use client";

import { useAdmins } from "@/lib/firestore/admins/read";
import { deleteAdmin } from "@/lib/firestore/admins/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ListView = () => {
  const { data: admins, error, isLoading } = useAdmins();

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
    <div className=" p-5 rounded-xl flex-1 flex flex-col gap-3">
      <h1 className="font-semibold">Admins</h1>
      <table className="border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="border-y font-semibold bg-white px-3 py-2 rounded-l-lg">
              SN
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2">Image</th>
            <th className="border-y font-semibold bg-white px-3 py-2 text-left">
              Name
            </th>
            <th className="border-y font-semibold bg-white px-3 py-2 rounded-r-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((item, index) => {
            return <Row index={index} item={item} key={item?.id} />;
          })}
        </tbody>
      </table>
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
      await deleteAdmin({ id: item?.id, public_id: item?.public_id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/admins?id=${item?.id}`);
  };
  return (
    <tr key={item.id || index}>
      <td className="border-y bg-white px-3 py-2 rounded-1-lg text-center rounded-l-lg">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2">
        <div className="flex justify-center">
          <img
            className="h-10 w-10 object-cover rounded-lg"
            src={item?.imageUrl || "Missing Image"}
            alt={item?.name || "Image"}
          />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">
        <h2>{item?.name}</h2>
        <h3 className="text-sm text-gray-500">{item?.email}</h3>
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
