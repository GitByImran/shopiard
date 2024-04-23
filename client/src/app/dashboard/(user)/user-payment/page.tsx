"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/loading-button";

const UserPaymentPage = () => {
  const { data: session, status } = useSession();
  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchUserPayments = async () => {
    try {
      if (!session?.user?.email) return;
      const email = session.user.email;
      const getPayments = await fetch(`/api/database/payment?email=${email}`, {
        method: "GET",
      });
      const response = await getPayments.json();
      setUserPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user payments:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchUserPayments();
  }, [status, session]);

  return (
    <div>
      {isClient && loading ? (
        <LoadingButton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {userPayments.map((payment: any, index: number) => (
            <div key={index} className="border p-2">
              <h2>Transaction ID: {payment.trxID}</h2>
              <p>Payment Status: {payment.status ? "Successful" : "Failed"}</p>
              <p>Payment Gateway: {payment.gw}</p>
              <p>Total Paid: ${payment.information.totalPrice}</p>
              {/* You can render other payment details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPaymentPage;
