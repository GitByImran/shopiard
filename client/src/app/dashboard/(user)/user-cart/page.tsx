"use client";

import CartTable from "@/components/cartTable";
import { useCart } from "@/utils/cartContext";
import React, { useEffect, useState } from "react";

const UserCartPage = () => {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="">Loading cart</div>;
  }

  return <div>{isClient && <CartTable cart={cart} />}</div>;
};

export default UserCartPage;
