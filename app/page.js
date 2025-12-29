import Image from "next/image";
import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import {
  getFeaturedProducts,
  getProduct,
  getProducts,
} from "@/lib/firestore/products/read_server";
import Collections from "./components/Collections";
import { getCollections } from "@/lib/firestore/collections/read_server";
import Categories from "./components/Categories";
import { getCategories } from "@/lib/firestore/categories/read_server";
import ProductGridView from "./components/Products";
import CustomerReviews from "./components/CustomerReviews";
import Brands from "./components/Brands";
import { getBrands } from "@/lib/firestore/brands/read_server";
import Footer from "./components/Footer";

export default async function Home() {
  const [featuredProducts, collections, categories, products, brands] =
    await Promise.all([
      getFeaturedProducts(),
      getCollections(),
      getCategories(),
      getProducts(),
      getBrands(),
    ]);
  // const featuredProducts = await getFeaturedProducts();
  // const collections = await getCollections();
  // const categories = await getCategories();
  // const products = await getProducts();
  // const brands = await getBrands();
  return (
    <main>
      <Header />
      <FeaturedProductSlider featuredProducts={featuredProducts} />
      <Collections collections={collections} />
      <Categories categories={categories} />
      <ProductGridView products={products} />
      <CustomerReviews />
      <Brands brands={brands} />
      <Footer />
    </main>
  );
}
