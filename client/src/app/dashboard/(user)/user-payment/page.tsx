"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/loading-button";
import { useGetPaymentByEmail } from "../../../../../lib/QueryAndMutation";
import {
  Banknote,
  Calendar,
  CircleCheck,
  CreditCard,
  FileDigit,
  Mail,
  Truck,
  UserCircle,
  XCircle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const UserPaymentPage = () => {
  const { data: session, status } = useSession();
  const [paymentData, setPaymentData] = useState([]);

  const { data, isLoading, isError, isSuccess } = useGetPaymentByEmail(
    session?.user?.email || ""
  );

  useEffect(() => {
    setPaymentData(data);
  }, [isSuccess]);

  if (isLoading) {
    return <LoadingButton />;
  }

  if (isError) {
    return <div>Falied to get user data!</div>;
  }

  console.log(paymentData);

  return (
    <div>
      {isSuccess && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paymentData &&
            paymentData.map((payment: any, index: number) => (
              <div key={index} className="border p-2 rounded shadow">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm">
                    <Calendar size={16} strokeWidth={1} />
                    {formatDate("2024-04-16T10:55:28.448+00:00")}
                  </p>
                  {payment.status ? (
                    <p title="Status : Paid">
                      <CircleCheck size={16} strokeWidth={2} stroke="green" />
                    </p>
                  ) : (
                    <p title="Status : Unpaid">
                      <XCircle size={16} strokeWidth={2} stroke="red" />
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  {payment?.information?.cart?.map(
                    (item: any, index: number) => (
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        key={index}
                        className="h-10 w-10 object-contain overflow-hidden"
                      />
                    )
                  )}
                </div>
                <div className="mt-2">
                  <h2 className="text-sm font-medium">Customer Details</h2>
                  <hr className="my-1" />
                  <p className="flex items-center gap-2 text-sm">
                    <UserCircle size={16} strokeWidth={1} />
                    <span>{payment.information.name}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail size={16} strokeWidth={1} />
                    <span>{payment.information.email}</span>
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-sm font-medium">Shipping Details</h2>
                  <hr className="my-1" />
                  <p className="flex items-center gap-2 text-sm">
                    <Truck size={16} strokeWidth={1} />
                    <span>{payment.information.address}</span>
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-sm font-medium">Payment Details</h2>
                  <hr className="my-1" />
                  <p className="flex items-center gap-2 text-sm capitalize">
                    <CreditCard size={16} strokeWidth={1} />
                    <span>{payment.gw}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Banknote size={16} strokeWidth={1} />
                    <span>BDT {payment.information.totalPrice.toFixed(2)}</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <FileDigit size={16} strokeWidth={1} />
                    <span>track id {payment.trxID}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserPaymentPage;
