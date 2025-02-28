import Link from "next/link";
import ListView from "./components/ListView";

const page = () => {
  return (
    <main className="flex flex-col gap-4 p-5">
      <div className="flex justify-between item-center">
        <h1 className="text-xl">Products</h1>
        <Link href={`/admin/products/form`}>
          <button className="text-sm bg-[#313131] text-white px-4 py-2 rounded-lg">
            Create
          </button>
        </Link>
      </div>
      <ListView />
    </main>
  );
};

export default page;
