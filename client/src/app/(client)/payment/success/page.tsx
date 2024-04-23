"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/utils/cartContext";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const trxId = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCart();

  const fetchPaymentData = async () => {
    const gw = localStorage.getItem("gw");
    console.log(gw);
    try {
      const response = await fetch(`/api/database/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trxId: trxId, status: true, gw: gw }),
      });

      if (response.ok) {
        console.log("Payment status updated successfully");
        localStorage.removeItem("gw");
        cart.forEach((item) => {
          removeFromCart(item.product.id);
        });
        setTimeout(() => {
          router.push("/dashboard/user-payment");
        }, 3000);
      } else {
        console.error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  useEffect(() => {
    if (trxId) {
      fetchPaymentData();
    }
  }, [trxId]);

  return (
    <div className="container">
      <p>Payment success</p>
    </div>
  );
};

export default PaymentSuccessPage;
