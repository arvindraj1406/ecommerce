"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Categories({ categories }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6 justify-center overflow-hidden md:p-10 p-4">
      <div className="flex justify-center w-full">
        <h1 className="text-lg font-semibold">Shop By Category</h1>
      </div>
      <Slider {...settings}>
        {categories?.map((category) => {
          //console.log(category.id);
          return (
            <div key={category?.id ?? category?.id}>
              <Link
                href={`/categories/${category.id}`}
                className="cursor-pointer"
              >
                <div className="px-2">
                  <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="h-32 w-32 rounded-full p-5 border overflow-hidden">
                      <img src={category?.imageUrl} alt="" />
                    </div>
                    <h1 className="font-semibold text-center">
                      {category?.name}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
