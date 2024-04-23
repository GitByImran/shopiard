"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/utils/cartContext";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import LoadingButton from "@/components/loading-button";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCart();
  const [count, setCount] = useState(6);
  const [success, setSuccess] = useState(false);

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

          const intervalId = setInterval(() => {
            setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
          }, 1000);

          setTimeout(() => {
            clearInterval(intervalId);
            router.replace("/dashboard/user-payment");
          }, 5000);

          setTimeout(() => {
            setSuccess(true);
          }, 500);
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
    <div className="container flex justify-center items-center py-40">
      {success ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="icon-wrapper">
            <CheckCircle
              stroke="green"
              size={50}
              className="check-circle-icon"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="font-bold text-2xl capitalize">Payment successful</p>
            <p>Redirecting in {count}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="font-bold text-2xl capitalize">
            checking payment status ...
          </p>{" "}
          <LoadingButton />
        </div>
      )}

      <style jsx>{`
        .icon-wrapper {
          animation: zoom-in 0.5s ease-in-out forwards;
        }

        @keyframes zoom-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1.25);
          }
        }

        .check-circle-icon {
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccessPage;
