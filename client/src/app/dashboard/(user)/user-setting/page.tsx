"use client";

import LoadingButton from "@/components/loading-button";
import { BadgeCheck, Mail, PenLine, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

interface UserProps {
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

const UserSettingPage = () => {
  const { data: session } = useSession();
  if (!session) return;
  const { name, email, image, isAdmin } = session?.user as UserProps;
  console.log(session);
  return (
    <div className="space-y-4">
      <div>
        {session ? (
          <div className="border p-5 flex items-center gap-5 relative">
            <img
              src={image ? image : "/dummy-avatar.png"}
              alt="user profile"
              className="max-w-[80px]"
            />
            <div>
              <h2 className="font-bold mb-2">{name}</h2>
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                <Mail size={16} />
                {email}
              </p>
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                {isAdmin ? (
                  <>
                    <ShieldCheck size={16} />
                    Admin
                  </>
                ) : (
                  <>
                    <BadgeCheck size={16} />
                    User
                  </>
                )}
              </p>
            </div>
            <button
              className="absolute top-2 right-2 p-1 sm:py-1 sm:px-4 border rounded bg-white text-black font-semibold hover:bg-gray-100 hover:shadow flex items-center gap-1"
              title="Edit Profile"
            >
              <PenLine size={16} />{" "}
              <span className="hidden sm:block">Edit Profile</span>
            </button>
          </div>
        ) : (
          <>
            Searching user data <LoadingButton />
          </>
        )}
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
