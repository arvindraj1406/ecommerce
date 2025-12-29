import { getProduct } from "@/lib/firestore/products/read_server";
import React from "react";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";

const Page = async ({ params }) => {
  const { productId } = params;
  const product = await getProduct({ id: productId });
  return (
    <main className="p-5 md:p-10">
      <section className="w-full flex flex-col md:flex-row justify-center">
        <div className="flex md:gap-10 max-w-[1000px] flex-col md:flex-row">
          <Photos
            imageList={[
              product?.featuredImageURL,
              ...(product?.imageList ?? []),
            ]}
          />
          <Details product={product} />
        </div>
      </section>
      <section className="w-full flex justify-center">
        <Reviews productId={productId} />
      </section>
      <section className="w-full flex justify-center">
        <RelatedProducts categoryId={product?.categoryId} />
      </section>
    </main>
  );
};

export default Page;
