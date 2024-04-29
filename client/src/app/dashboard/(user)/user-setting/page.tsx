"use client";

import React, { useState } from "react";
import ProfileSetup from "@/components/profile-setup";
import { useSession } from "next-auth/react";

const UserSettingPage = () => {
  const { data: session } = useSession();
  if (!session) return;

  return (
    <div className="space-y-4">
      <div>
        <ProfileSetup session={session} />
      </div>
      <div className="p-5 border-2 border-l-8 border-l-cyan-600 flex md:flex-row flex-col justify-between md:items-center items-start gap-5">
        <div>
          <h2 className="font-bold text-lg">Change Password</h2>
          <p className="text-sm">
            If you have forgot your password or if you want to set a new
            password, click on change password.
          </p>
        </div>

        <button className="min-w-max bg-white hover:bg-gray-100 hover:shadow text-black border font-semibold rounded py-1 px-4">
          Change Password
        </button>
      </div>
      <div className="p-5 border-2 border-l-8 border-l-cyan-600 flex md:flex-row flex-col justify-between md:items-center items-start gap-5">
        <div>
          <h2 className="font-bold text-lg">Delete Account</h2>
          <p className="text-sm">
            If you delete your account, your all payments, orders and other
            documents will delete. Deleted data cannot be recovered again.
          </p>
        </div>

        <button className="min-w-max bg-white hover:bg-gray-100 hover:shadow text-black border font-semibold rounded py-1 px-4">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserSettingPage;
