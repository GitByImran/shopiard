"use client";

import React from "react";
import { useSession } from "next-auth/react";
import LoadingButton from "@/components/loading-button";

interface UserProps {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

const DashboardPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <LoadingButton />;
  }

  if (session.user) {
    const { name, email, image, isAdmin } = session.user as UserProps;
    console.log(session);

    return <div>{isAdmin ? "Admin Dashboard" : "User Dashboard"}</div>;
  }

  return <LoadingButton />;
};

export default DashboardPage;
