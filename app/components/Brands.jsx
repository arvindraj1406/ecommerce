"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Brands({ brands }) {
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
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col gap-6 justify-center overflow-hidden md:p-10 p-2">
      <Slider key={`brands-slider-3`} {...settings}>
        {brands?.map((brand) => {
          //console.log(category);
          return (
            <div key={brand.id} className="px-2">
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className=" h-20 rounded-lg p-5 border overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={brand?.imageUrl}
                    alt=""
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
