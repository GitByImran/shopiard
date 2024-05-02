"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingButton from "./loading-button";
import { Admin_Dash_Menus, User_Dash_Menus } from "@/utils/dashMenu";
import { Home } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  if (!session) {
    return <LoadingButton />;
  }

  const { isAdmin } = session.user as any;

  return (
    <div>
      <ul className="space-y-1 select-none">
        {isAdmin
          ? Admin_Dash_Menus.map((menu: any, index: number) => (
              <li key={index} className="w-full">
                <Link
                  href={menu.goto}
                  className={`px-2 py-1 rounded text-md font-medium capitalize cursor-pointer hover:bg-cyan-600 hover:text-white w-full flex items-center gap-2 ${
                    isActive(menu.goto) ? "bg-cyan-600 text-white" : ""
                  }`}
                >
                  {menu.icon}
                  {menu.label}
                </Link>
              </li>
            ))
          : User_Dash_Menus.map((menu: any, index: number) => (
              <li key={index} className="w-full">
                <Link
                  href={menu.goto}
                  className={`px-2 py-1 rounded text-md font-medium capitalize cursor-pointer hover:bg-cyan-600 hover:text-white w-full flex items-center gap-2 ${
                    isActive(menu.goto) ? "bg-cyan-600 text-white" : ""
                  }`}
                >
                  {menu.icon}
                  {menu.label}
                </Link>
              </li>
            ))}
        <hr style={{ margin: "10px 0" }} />
        <li className="w-full">
          <Link
            href={"/"}
            className={
              "px-2 py-1 rounded text-md font-medium capitalize cursor-pointer hover:bg-cyan-600 hover:text-white w-full flex items-center gap-2"
            }
          >
            <Home size={18} /> Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
