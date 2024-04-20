"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartItem, useCart } from "@/utils/cartContext";
import { Minus, Plus, SquarePen, Trash } from "lucide-react";
import Link from "next/link";

const CartTable = ({ cart }: { cart: CartItem[] }) => {
  const { removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>(cart);

  const totalPrice = cartItems.reduce((total: number, item: CartItem) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedCart);
    removeFromCart(productId);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedItem = { ...cartItems[index], quantity };
    const updatedCartCopy = [...cartItems];
    updatedCartCopy[index] = updatedItem;
    setCartItems(updatedCartCopy);
  };

  if (cart.length <= 0) {
    return (
      <div>
        No product in cart.{" "}
        <Link href={"/product"} className="underline text-cyan-600">
          Select product from here
        </Link>{" "}
        or{" "}
        <Link href={"/"} className="underline text-cyan-600">
          get back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={item.product.id}>
              <TableCell>
                <button
                  onClick={() => handleRemoveFromCart(item.product.id)}
                  className="p-2 hover:border hover:shadow hover:text-red-500 rounded-full"
                >
                  <Trash size={20} />
                </button>
              </TableCell>

              <TableCell>
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-10 w-10 object-cover rounded-lg"
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-5">
                  <button
                    className="border p-1"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-md">{item.quantity}</span>
                  <button
                    className="border p-1"
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${(item.product.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Price:</TableCell>
            <TableCell className="text-right font-bold">
              ${totalPrice.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="my-10 flex flex-wrap items-center gap-2">
        <h2 className="">
          {">>"} You have selected total {cart.length} items and you have to pay
          total ${Math.round(totalPrice)}
        </h2>
        <button className="px-4 py-1 bg-cyan-600 text-white font-bold rounded capitalize hover:bg-cyan-800">
          proceed to checkout !
        </button>
      </div>
    </div>
  );
};

export default CartTable;
