"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "@/components/sections/productSection";
import { discountedPrice } from "@/lib/utils";
import {
  CircleCheck,
  CircleX,
  LayoutGrid,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductDetails = ({ params }: any) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      const findProductById = productsData.products.find(
        (item: any) => item.id === parseInt(params.slug[0])
      );
      setProduct(findProductById);
    };
    fetchProducts();
  }, []);

  if (!product) {
    return <div>Loading Product...</div>;
  }

  return (
    <div className="my-10">
      <div className="container">
        <div className="flex md:flex-row flex-col gap-10">
          <div className="flex-1">
            <img
              src={product.thumbnail}
              alt=""
              className="h-[100%] w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold ">{product.title}</h2>
            <hr className="my-4" />
            <div className="space-y-4">
              <p className="flex gap-2 items-baseline">
                {product.discountPercentage > 0 && (
                  <sub className="text-slate-400">
                    <del>${product.price}</del>
                  </sub>
                )}
                <span className="text-xl font-bold">
                  $
                  {product.discountPercentage > 0
                    ? discountedPrice(product.price, product.discountPercentage)
                    : product.price}
                </span>
              </p>
              <p className="flex items-center gap-2 font-bold">
                <Tag size={20} />
                {product.brand}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold">
                  <LayoutGrid size={20} />
                </span>
                <span className="capitalize font-bold">{product.category}</span>
              </p>
              <p className="">
                {product.stock > 0 ? (
                  <span className="flex items-center gap-2 text-green-600 font-bold">
                    <CircleCheck size={20} /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-600 font-bold">
                    <CircleX size={16} /> Out of Stock
                  </span>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="max-w-[180px]">
                  <Rating readOnly value={product.rating} />
                </p>
                <p className="font-bold">{product.rating} Ratings</p>
              </div>
              <div className="py-4 flex items-center gap-5">
                <p className="font-bold">Quantity</p>
                <div className="flex items-center gap-5 border">
                  <button className="border-r p-1">
                    <Plus />
                  </button>
                  <span className="font-bold text-lg">0</span>
                  <button className="border-l p-1">
                    <Minus />
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-full border p-2 border-none outline-none select-none font-bold bg-cyan-600 text-white hover:bg-cyan-800">
                  Add To Cart
                </button>
                <button className="w-full border p-2 border-none outline-none select-none font-bold bg-amber-600 text-white hover:bg-cyan-800">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
