"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/loading-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetUserByEmail } from "../../../lib/QueryAndMutation";

interface UserProps {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

const DashboardPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserProps | null>(null);

  const { data, isLoading, isError, isSuccess } = useGetUserByEmail(
    session?.user?.email || ""
  );

  useEffect(() => {
    setUserData(data);
  }, [isSuccess]);

  if (isLoading) {
    return <LoadingButton />;
  }

  if (isError) {
    return <div>Falied to get user data!</div>;
  }

  return (
    <div>
      {isSuccess && (
        <div>
          <p>{userData?.name}</p>
          <p>{userData?.email}</p>
          <p>{userData?.isAdmin ? "Admin" : "User"}</p>

          <img
            src={userData?.image}
            alt={userData?.name}
            className="h-10 w-10 rounded-full overflow-hidden border-2"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
