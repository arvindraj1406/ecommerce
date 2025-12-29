"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";

export default function BasicDetails({ data, handleData }) {
  const { data: brands } = useBrands(); //destructuring with renaming
  const { data: categories } = useCategories();
  return (
    <section className="flex flex-col flex-1 gap-3 bg-white rounded-xl p-4 border">
      <h1 className="font-semibold">Basic Details</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-title" className="text-gray-500 text-sm">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          id="product-title"
          name="product-title"
          value={data?.title ?? ""}
          onChange={(e) => {
            handleData("title", e.target.value);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="product-short-description"
          className="text-gray-500 text-sm"
        >
          Short Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter Short Description"
          id="product-short-description"
          name="product-short-description"
          value={data?.shortDescription ?? ""}
          onChange={(e) => {
            handleData("shortDescription", e.target.value);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-brand" className="text-gray-500 text-sm">
          Brand <span className="text-red-500">*</span>
        </label>
        <select
          type="text"
          id="product-brand"
          name="product-brand"
          value={data?.brandId ?? ""}
          onChange={(e) => {
            handleData("brandId", e.target.value);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Select Brand</option>
          {brands?.map((item) => {
            return (
              <option value={item?.id} key={item?.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-category" className="text-gray-500 text-sm">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          type="text"
          id="product-category"
          name="product-category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            handleData("categoryId", e.target.value);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value="">Select Category</option>
          {categories?.map((item) => {
            return (
              <option value={item?.id} key={item?.id}>
                {item?.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-stock" className="text-gray-500 text-sm">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Stock"
          id="product-stock"
          name="product-stock"
          value={data?.stock ?? ""}
          onChange={(e) => {
            handleData("stock", e.target.valueAsNumber);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-price" className="text-gray-500 text-sm">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Price"
          id="product-price"
          name="product-price"
          value={data?.price ?? ""}
          onChange={(e) => {
            handleData("price", e.target.valueAsNumber);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-sale-price" className="text-gray-500 text-sm">
          Sale Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Enter Sale Price"
          id="product-sale-price"
          name="product-sale-price"
          value={data?.saleprice ?? ""}
          onChange={(e) => {
            handleData("saleprice", e.target.valueAsNumber);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="product-is-featured" className="text-gray-500 text-sm">
          Is Featured Product <span className="text-red-500">*</span>
        </label>
        <select
          type="number"
          placeholder="Enter Sale Price"
          id="product-is-featured"
          name="product-is-featured"
          value={data?.isFeatured ? "yes" : "no"}
          onChange={(e) => {
            handleData("isFeatured", e.target.value === "yes" ? true : false);
          }}
          className="border text-sm px-4 py-2 rounded-lg w-full outline-none"
          required
        >
          <option value={"no"}>No</option>
          <option value={"yes"}>Yes</option>
        </select>
      </div>
    </section>
  );
}
