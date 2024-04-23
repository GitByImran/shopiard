"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/utils/cartContext";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import LoadingButton from "@/components/loading-button";

const PaymentFailPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCart();
  const [count, setCount] = useState(6);
  const [fail, setFail] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const trxId = searchParams.get("id");

      try {
        const response = await fetch(`/api/database/payment?trxId=${trxId}`, {
          method: "DELETE",
        });

        console.log(response);

        if (response.ok) {
          console.log("Payment status deleted!");
          localStorage.removeItem("gw");

          const intervalId = setInterval(() => {
            setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
          }, 1000);

          setTimeout(() => {
            clearInterval(intervalId);
            router.replace("/dashboard/user-cart");
          }, 5000);

          setTimeout(() => {
            setFail(true);
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
      {fail ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="icon-wrapper">
            <XCircle stroke="red" size={50} className="check-circle-icon" />
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="font-bold text-2xl capitalize">Payment failed</p>
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

export default PaymentFailPage;
