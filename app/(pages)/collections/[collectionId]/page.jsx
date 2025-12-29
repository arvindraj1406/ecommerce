import { ProductCard } from "@/app/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";

export default async function Page({ params }) {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });

  return (
    <main className="flex justify-center p-5 md:px-10 md:py-5 w-full">
      <div className="flex flex-col gap-5 max-w-[1000px] mx-auto">
        <div className="flex justify-center items-center ">
          <div>
            <img src={collection?.imageUrl} className="h-[40px] px-4" alt="" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-center font-semibold text-xl">
              {collection?.title}
            </h1>
            <h2 className="text-center text-gray-500 text-sm">
              {collection?.subtitle}
            </h2>
          </div>
        </div>
        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-2
          md:gap-4"
        >
          {collection?.products?.map((productId) => (
            <div className="border p-4 rounded-lg">
              <Product productId={productId} key={productId} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
async function Product({ productId }) {
  const product = await getProduct({ id: productId });
  return <ProductCard product={product} />;
}
