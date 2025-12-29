"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" overflow-hidden pb-5">
      <Slider {...settings}>
        {featuredProducts?.map((product) => {
          //console.log(product);
          return (
            <div key={product.id}>
              <div className="bg-[#f8f8f8] flex flex-col-reverse md:flex-row gap-4 w-full md:px-24 md:py-20 p-10">
                <div className="flex-1 flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-500 text-sm md:text-base">
                      NEW PRODUCT
                    </h3>
                    <Link href={`/products/${product?.id}`}>
                      <h2 className="md:text-4xl text-xl pb-3 font-semibold max-w-2xl">
                        {product?.title}
                      </h2>
                    </Link>
                    <p className="text-grey-600 text-sm max-w-96 line-clamp-2">
                      {product?.shortDescription}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-blue-500 text-white text-xs md:text-sm">
                      BUY NOW
                    </Button>
                    <Button className="border-2 border-blue-500 text-blue-500 bg-white text-xs md:text-sm">
                      ADD TO CART
                    </Button>

                    <Button
                      isIconOnly
                      className="border-2 p-0 w-2 border-pink-500 text-pink-500 bg-white"
                    >
                      <Heart size={14} />
                    </Button>
                  </div>
                </div>
                <div>
                  <Link href={`/products/${product?.id}`}>
                    {" "}
                    <img
                      className="h-[14rem] md:h-[23rem]"
                      src={product?.featuredImageURL}
                      alt="banner image"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
