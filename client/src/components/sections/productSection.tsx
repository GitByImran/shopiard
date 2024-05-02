"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../productCard";
import ShowMoreCard from "../showMoreCard";
import "swiper/css";
import "swiper/css/navigation";
import { useGetProducts } from "../../../lib/QueryAndMutation";
import LoadingButton from "../loading-button";

const ProductSection = () => {
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading, isError, isSuccess } = useGetProducts();

  useEffect(() => {
    setProducts(data);
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="my-10">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    return <div className="container">Falied to get user data!</div>;
  }

  return (
    <div className="my-10 space-y-10">
      <div>
        <h2 className="mb-10 font-bold text-xl text-slate-500 select-none">
          Our featured products at a glance
        </h2>
        {/* Featured Products Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products &&
            products
              .slice(0, 9)
              .map((product: any) => (
                <ProductCard product={product} key={product.id} />
              ))}
          {products && products.length > 10 && (
            <ShowMoreCard show={"product"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
