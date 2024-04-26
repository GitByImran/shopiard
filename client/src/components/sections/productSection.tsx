"use client";
// src>components>sections>productSection.tsx

import React, { useState, useEffect } from "react";
import ProductCard from "../productCard";
import ShowMoreCard from "../showMoreCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { getProducts } from "@/lib/product";
import { useRouter } from "next/navigation";

const generateSwiperComponent = (items: string[], autoplayDelay: number, isBrand: boolean) => (
  <Swiper
    slidesPerView={6}
    spaceBetween={10}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    breakpoints={{
      0: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 50,
      },
    }}
    modules={[Autoplay, Pagination]}
    className="mySwiper"
  >
    <div className="">
      {items.map((item: string, index: number) => (
        <SwiperSlide key={index}>
  
            <p className="p-4 bg-slate-50 text-slate-600 font-bold capitalize border rounded-lg break-words">
              {item}
            </p>

        </SwiperSlide>
      ))}
    </div>
  </Swiper>
);

const ProductSection = () => {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const autoplayDelay = 1000;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData.products);

      const uniqueCategories = Array.from(
        new Set(productsData.products.map((product: any) => product.category))
      );
      setCategories(uniqueCategories);

      const uniqueBrands = Array.from(
        new Set(productsData.products.map((product: any) => product.brand))
      );
      setBrands(uniqueBrands);
    };
    fetchProducts();
  }, []);

  return (
    <div className="my-10 space-y-10">
      <div>
        <h2 className="mb-10 font-bold text-xl text-slate-500 select-none">
          Our featured products at a glance
        </h2>
        {/* Featured Products Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.slice(0, 9).map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
          {products.length > 10 && <ShowMoreCard show={"product"} />}
        </div>
      </div>

      {/* Popular Categories Section */}
      <div>
        <h2 className="mb-10 font-bold text-xl text-slate-500 select-none">
          Discover popular categories
        </h2>
        {generateSwiperComponent(categories, autoplayDelay, false)}
      </div>

      {/* Popular Brands Section */}
      <div>
        <h2 className="mb-10 font-bold text-xl text-slate-500 select-none">
          Explore top brands
        </h2>
        {generateSwiperComponent(brands, autoplayDelay, true)}
      </div>
    </div>
  );
};

export default ProductSection;
