"use client";

import React, { useEffect, useState } from "react";
import { discountedPrice } from "@/lib/utils";
import {
  CircleCheck,
  CircleX,
  LayoutPanelTop,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ImageGallery from "@/components/imageGallery";
import { useCart } from "@/utils/cartContext";
import { getProducts } from "@/lib/product";

const ProductDetails = ({ params }: any) => {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem = {
      product: product,
      quantity: quantity,
    };
    addToCart(newItem);
  };

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

  useEffect(() => {
    const foundItem = cart.find((item: any) => item.product.id === product?.id);
    if (foundItem) {
      setQuantity(foundItem.quantity);
    }
  }, [cart, product]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div className="container">Loading Product...</div>;
  }

  return (
    <div className="">
      <div className="container select-none">
        <div>
          <p className="flex items-center flex-wrap gap-2 py-4  text-sm font-semibold capitalize">
            <span>product</span>
            {">"}
            <span>{product.category}</span>
            {">"}
            <span>{product.brand}</span>
            {">"}
            <span>{product.title}</span>
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-10">
          <div className="flex-1">
            <ImageGallery images={product.images} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold ">{product.title}</h2>
            <hr className="my-4" />
            <div className="space-y-4">
              <p className="flex gap-2 items-center">
                {product.discountPercentage > 0 && (
                  <sub className="text-slate-400 text-lg">
                    <del>${product.price}</del>
                  </sub>
                )}
                <span className="text-2xl font-bold text-cyan-600">
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
                  <LayoutPanelTop size={20} />
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
                <div className="max-w-[180px]">
                  <Rating readOnly value={product.rating} />
                </div>
                <p className="font-bold">{product.rating} Ratings</p>
              </div>
              <div className="py-4 flex items-center gap-5">
                <p className="font-bold">Quantity</p>
                <div className="flex items-center gap-5 border">
                  <button onClick={handleDecrement} className="border-r p-1">
                    <Minus />
                  </button>
                  <span className="font-bold text-lg">{quantity}</span>

                  <button onClick={handleIncrement} className="border-l p-1">
                    <Plus />
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={cart.some(
                    (item: any) => item.product.id === product.id
                  )}
                  className={`w-full border p-2 border-none outline-none select-none font-bold ${
                    cart.some((item: any) => item.product.id === product.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-cyan-600 hover:bg-cyan-800"
                  } text-white`}
                >
                  {cart.some((item: any) => item.product.id === product.id)
                    ? "Already in Cart"
                    : "Add To Cart"}
                </button>
                <button className="w-full border p-2 border-none outline-none select-none font-bold bg-amber-600 text-white hover:bg-amber-800">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div>
          <div className="mt-10 space-y-4">
            <div className="">
              <h2 className="w-fit py-1 border-b-4 border-cyan-600 text-2xl font-bold">
                Description
              </h2>
              <hr className="border-cyan-600" />
            </div>
            {/* <p>{product.description}</p> */}
            <p className="text-slate-600">
              The iPhone X, a flagship device from Apple Inc., represents a
              pinnacle of innovation and technology in the realm of smartphones.
              Renowned for its sleek design, cutting-edge features, and powerful
              performance, Featuring a glass front and back, stainless steel
              frame, and edge-to-edge display, the iPhone X exudes premium
              craftsmanship and attention to detail. Its slim profile and
              seamless construction make it a pleasure to hold and use, while
              its durable materials ensure longevity and durability. One of the
              standout features of the iPhone X is its advanced Face ID
              technology, which revolutionizes the way users unlock their
              devices and authenticate securely. With Face ID, users can
              effortlessly unlock their iPhone X with just a glance, eliminating
              the need for traditional passwords or fingerprint sensors. Powered
              by a sophisticated TrueDepth camera system, Face ID accurately
              maps the user's face in three dimensions, providing unparalleled
              security and convenience. In addition to Face ID, the iPhone X
              boasts an impressive array of camera capabilities that empower
              users to capture stunning photos and videos with ease. Equipped
              with a dual-camera system, featuring wide and telephoto lenses,
              the iPhone X delivers breathtaking photography in any lighting
              condition. From vibrant landscapes to detailed portraits, the
              iPhone X's camera system excels in capturing the beauty of the
              world around us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


