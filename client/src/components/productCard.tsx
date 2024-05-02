import { useCart } from "@/utils/cartContext";
import { CircleCheck, CirclePlus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import BuyNowPopup from "./buyNowPopup";

const ProductCard = ({ product }: any) => {
  const { cart, addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);

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

  const handleShowBuyNowPOpup = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-lg overflow-hidden" key={product._id}>
      <div className="h-28 sm:h-52 w-full">
        <Link href={`/product/${product?._id}`}>
          <img
            src={product.thumbnailImage}
            alt={product.title}
            className="h-full w-full object-cover select-none"
          />
        </Link>
      </div>
      <div className="p-4 space-y-4">
        <h3 className="truncate select-none">{product.title}</h3>
        <div className="flex items-center justify-between">
          <p className="font-bold select-none">
            BDT{" "}
            {product.discountPercentage > 0 ? discountedPrice : product.price}
          </p>
          <button className="" onClick={handleAddToCart}>
            <span
              className={`${
                cart && cart.some((item: any) => item.product.id === product.id)
                  ? "text-emerald-600"
                  : "text-cyan-600"
              }`}
            >
              {cart &&
              cart.some((item: any) => item.product.id === product.id) ? (
                <CircleCheck size={20} />
              ) : (
                <CirclePlus size={20} />
              )}
            </span>
          </button>
        </div>
      </div>

      <button
        onClick={handleShowBuyNowPOpup}
        className="w-full border py-1 border-none outline-none select-none bg-cyan-600 text-white hover:bg-cyan-800"
      >
        Buy Now
      </button>
      {showModal && (
        <BuyNowPopup
          showModal={showModal}
          setShowModal={setShowModal}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductCard;
