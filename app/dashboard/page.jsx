import Link from "next/link";

const page = () => {
  return (
    <main className="p-10">
      <h1>Dashboard</h1>
      <Link href={"/admin"}>Admin Panel</Link>
    </main>
  );
};

export default page;
