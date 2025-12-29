import { Rating } from "@mui/material";
import { Button } from "@nextui-org/react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductGridView({ products = [] }) {
  console.log(products);
  if (!products.length) return <div>No products found</div>;

  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[1000px] px-4">
        <h1 className="text-center font-semibold text-lg">Products</h1>
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
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg">
      <div className="relative">
        <img
          className="rounded-lg h-25 object-cover"
          src={product?.featuredImageURL}
          alt={product?.title}
        />

        <div className="absolute top-0 right-0 z-10">
          <Button
            variant="flat"
            color="danger"
            className="rounded-full"
            isIconOnly
            size="sm"
          >
            <Heart size={13} />
          </Button>
        </div>
      </div>

      <Link href={`/products/${product?.id}`}>
        <h2 className="font-semibold text-sm line-clamp-2">{product?.title}</h2>
      </Link>
      <div>
        <h3 className="text-green-500 text-sm font-semibold">
          <span className="line-through text-xs text-gray-400 mr-1">
            {"\u20B9"}
            {product?.price}
          </span>
          {"\u20B9"}
          {product?.saleprice}
        </h3>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <div className="flex gap-3 items-center">
        <Rating
          size="small"
          name="product-rating"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
        <div className="text-xs text-gray-400">(0)</div>
      </div>
      <div className="flex item-center gap-4">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded-lg">
          Buy Now
        </button>
        <Button isIconOnly size="sm" className="py-2">
          <ShoppingCart size={16} />
        </Button>
      </div>
    </div>
  );
}
