"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/utils/cartContext";

const PaymentSuccessPage = () => {
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchPaymentData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const trxId = searchParams.get("id");
      const gw = localStorage.getItem("gw");

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
            window.location.href = "/dashboard/user-payment";
          }, 3000);
        } else {
          console.error("Failed to update payment status");
        }
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };

    const trxId = new URLSearchParams(window.location.search).get("id");
    if (trxId) {
      fetchPaymentData();
    }
  }, []);

  return (
    <div className="container">
      <p>Payment success</p>
    </div>
  );
};

export default PaymentSuccessPage;
