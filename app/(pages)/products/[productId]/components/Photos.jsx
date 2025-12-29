"use client";
import React, { useState } from "react";

const Photos = ({ imageList }) => {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col gap-3 mb-5 md:mb-0 ">
      <div className="flex justify-center w-full border hover:border-[#b9b9b9] rounded-md">
        <img className="h-[350px]  object-cover" src={selectedImage} />
      </div>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {imageList?.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => {
                setSelectedImage(item);
              }}
              className="border hover:border-[#b9b9b9] rounded-md p-2 w-[80px]"
            >
              <img src={item} alt="" className="object-cover " />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
