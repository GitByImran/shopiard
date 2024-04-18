"use client";

import { useCart } from "@/utils/cartContext";
import { CircleCheck, CirclePlus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: any) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem = {
      product: product,
      quantity: 1,
    };
    addToCart(newItem);
  };

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-52 w-full">
        <Link href={`/product/${product?.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover select-none"
          />
        </Link>
      </div>
      <div className="p-4 space-y-4">
        <h3 className="truncate select-none">{product.title}</h3>
        <div className="flex items-center justify-between">
          <p className="font-bold select-none">
            ${product.discountPercentage > 0 ? discountedPrice : product.price}
          </p>
          <button className="relative" onClick={handleAddToCart}>
            <ShoppingCart size={20} className="hover:text-cyan-600" />
            <span className="absolute -top-3 -right-2">
              <CirclePlus size={16} />
              {/* <CircleCheck size={16} /> */}
            </span>
          </button>
        </div>
      </div>

      <button className="w-full border py-1 border-none outline-none select-none bg-cyan-600 text-white hover:bg-cyan-800">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
