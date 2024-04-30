"use client";

import React, { useState } from "react";
import ProfileSetup from "@/components/profile-setup";
import { useSession } from "next-auth/react";
import ChangePassword from "@/components/changePassword";
import DeleteAccount from "@/components/deleteAccount";

const UserSettingPage = () => {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <div className="space-y-4">
      <div>
        <ProfileSetup session={session} />
      </div>
      <div>
        <ChangePassword session={session} />
      </div>
      <DeleteAccount session={session} />
    </div>
  );
};

export default UserSettingPage;
