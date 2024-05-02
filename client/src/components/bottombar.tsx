"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingButton from "./loading-button";
import { Admin_Dash_Menus, User_Dash_Menus } from "@/utils/dashMenu";
import { Home } from "lucide-react";

const Bottombar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  if (!session) {
    return (
      <div className="container">
        <LoadingButton />
      </div>
    );
  }

  const { isAdmin } = session.user as any;

  return (
    <div className="mx-5">
      <ul className="flex items-center justify-between select-none">
        {isAdmin
          ? Admin_Dash_Menus.map((menu: any, index: number) => (
              <li key={index} className="">
                <Link
                  href={menu.goto}
                  className={`cursor-pointer hover:bg-cyan-600 hover:text-white ${
                    isActive(menu.goto)
                      ? "bg-cyan-600 text-red-500 h-40 border"
                      : ""
                  }`}
                >
                  <span className="border">{menu.icon}</span>
                </Link>
              </li>
            ))
          : User_Dash_Menus.map((menu: any, index: number) => (
              <li
                key={index}
                className={`${
                  isActive(menu.goto)
                    ? "bg-cyan-600 p-2 -mt-10 rounded-full text-white border-4 border-white"
                    : ""
                }`}
              >
                <Link href={menu.goto}>{menu.icon}</Link>
              </li>
            ))}
        <li className="">
          <Link href={"/"}>
            <Home />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Bottombar;
