"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Collections({ collections }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="overflow-hidden md:p-10 p-4">
      <Slider {...settings}>
        {collections?.map((collection) => {
          console.log(collection);
          return (
            <div key={collection.id} className="px-2">
              <div className="bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] flex gap-4 w-full md:p-7 p-4 rounded-xl h-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold max-w-2xl">
                      {collection?.title}
                    </h2>
                    <p className="text-grey-600 text-sm max-w-96 line-clamp-2">
                      {collection?.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/collections/${collection?.id}`}>
                      <Button className="bg-blue-500 text-white text-xs px-3 py-1 h-8">
                        SHOP NOW
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <img
                    className="h-[5rem]"
                    src={collection?.imageUrl}
                    alt="banner image"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
