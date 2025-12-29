import { ProductCard } from "@/app/components/Products";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductByCategory } from "@/lib/firestore/products/read_server";

export default async function Page({ params }) {
  const { categoryId } = await params; // ✅ already available, no await
  const category = await getCategory({ id: categoryId });
  const products = await getProductByCategory({ categoryId });

  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="flex flex-col gap-5 max-w-[1000px] mx-auto">
        <h1 className="text-center font-semibold text-xl">{category?.name}</h1>
        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-2
          md:gap-4"
        >
          {products.map((item) => (
            <div className="border p-4 rounded-lg" key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
