import { ProductCard } from "@/app/components/Products";
import { getProductByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({ categoryId }) {
  const products = await getProductByCategory({ categoryId: categoryId });
  return (
    <div className="flex flex-col gap-5 max-w-[1000px] pt-10">
      <h1 className="text-center font-semibold text-lg">Related Products</h1>
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
            <ProductCard product={item} key={item?.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
