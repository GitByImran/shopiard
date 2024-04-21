"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CheckOutModal from "@/components/checkOutModal";
import CartTable from "@/components/cartTable";
import { useCart } from "@/utils/cartContext";
import LoadingButton from "@/components/loading-button";

const UserCartPage: React.FC = () => {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (!session || !cart) {
    return (
      <div className="">
        {" "}
        <LoadingButton />
      </div>
    );
  }

  return (
    <div>
      <div>
        {!cart.length ? (
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
        ) : (
          <CartTable
            cart={cart}
            onProceedToCheckout={() => setShowCheckoutModal(true)}
          />
        )}
      </div>
      {showCheckoutModal && (
        <CheckOutModal
          user={session?.user}
          cart={cart}
          setShowCheckoutModal={setShowCheckoutModal}
        />
      )}
    </div>
  );
};

export default UserCartPage;
