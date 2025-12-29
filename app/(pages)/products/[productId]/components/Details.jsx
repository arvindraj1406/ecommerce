import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { Button, Link } from "@nextui-org/react";
import { Heart } from "lucide-react";
import React from "react";

const Details = ({ product }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>
      <h1 className="font-semibold text-xl md:text-4xl">{product?.title}</h1>
      <h2 className="text-sm text-gray-600 line-clamp-2 md:line-clamp-4">
        {product?.shortDescription}
      </h2>
      <div className="text-green-500 text-base font-semibold">
        <span className="line-through text-gray-500 text-sm mr-4">
          {"\u20B9"} {product?.price}
        </span>
        {"\u20B9"} {product?.saleprice}
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button variant="solid" className="bg-black text-white">
          Buy Now
        </Button>
        <Button variant="bordered" className="">
          Add To Cart
        </Button>
        <Button variant="bordered" isIconOnly color="danger">
          <Heart size={13} />
        </Button>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <div className="text-base font-semibold">Description</div>
        <div
          className="text-gray-600 text-sm"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
};

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`} className="cursor-pointer">
      <div className="flex items-center gap-2 border px-3 py-1 rounded-full">
        <img className="h-4" src={category?.imageUrl} alt="" />
        <h4 className="text-xs font-semibold">{category?.name}</h4>
      </div>
    </Link>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-2 border px-3 py-1 rounded-full">
      <img className="h-4" src={brand?.imageUrl} alt="" />
      <h4 className="text-xs font-semibold">{brand?.name}</h4>
    </div>
  );
}

export default Details;
