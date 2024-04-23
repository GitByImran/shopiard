"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import LoadingButton from "./loading-button";
import { useCart } from "@/utils/cartContext";

interface PaymentMethod {
  name: string;
  type: string;
  logo: string;
  gw: string;
  r_flag?: string;
  redirectGatewayURL?: string;
}

const CheckOutModal = ({ user, cart, amount, setShowCheckoutModal }: any) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    contact: "",
  });

  const { totalPrice, removeFromCart } = useCart();

  const [methods, setMethods] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
    // const roundedTotalPrice = Math.round(totalPrice);

    const res = await fetch("/api/gateway/payment", {
      method: "POST",
      body: JSON.stringify({ tran_id, totalPrice, user, formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const filteredMethods = data.data.desc.filter(
      (method: PaymentMethod) =>
        method.name.toLowerCase() === "bkash" ||
        method.name.toLowerCase() === "nagad"
    );
    setMethods(filteredMethods);
    setIsLoading(false);

    const paymentData = {
      information: {
        name: user.name,
        email: user.email,
        address: formData.address,
        contact: formData.contact,
        cart: cart,
        totalPrice: totalPrice,
      },
      trxId: tran_id,
      status: false,
      gw: "",
    };

    try {
      const fetchUrl = await fetch("/api/database/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const res = await fetchUrl.json();
      console.log("Response:", res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (selectedPaymentMethod) {
    localStorage.setItem("gw", selectedPaymentMethod);
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full flex justify-center items-center bg-black/70">
      <div className="relative w-full max-w-[600px] m-5 p-5 bg-white rounded-lg">
        <div className="flex justify-end">
          <X onClick={() => setShowCheckoutModal(false)} cursor={"pointer"} />
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="text-md border px-3 py-2 rounded-md focus:outline-none focus:border-cyan-500"
                  value={formData.name}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="text-md border px-3 py-2 rounded-md focus:outline-none focus:border-cyan-500"
                  value={formData.email}
                  disabled={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-semibold">
                  Address
                  <span className="mx-1 text-cyan-800 text-xs">(required)</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="text-md border px-3 py-2 rounded-md focus:outline-none focus:border-cyan-500"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  required={true}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact" className="text-sm font-semibold">
                  Contact{" "}
                  <span className="mx-1 text-cyan-800 text-xs">(required)</span>
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  className="text-md border px-3 py-2 rounded-md focus:outline-none focus:border-cyan-500"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 my-4">
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-800 rounded-md capitalize ${
                (!formData.name ||
                  !formData.email ||
                  !formData.address ||
                  !formData.contact ||
                  isLoading) &&
                "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              }`}
            >
              Choose Payment Method
            </button>

            <div className="flex gap-2">
              {isLoading && <LoadingButton />}
              {!isLoading &&
                methods &&
                methods.map((method: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPaymentMethod(method.name)}
                  >
                    <Link href={method.redirectGatewayURL || ""}>
                      <img
                        src={method.logo}
                        alt={method.name}
                        className="h-12 min-w-12 w-full object-contain border border-gray-300 rounded-md  hover:shadow-lg p-2"
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOutModal;
