"use client";
import {
  Box,
  CreditCard,
  Home,
  Settings,
  ShoppingCart,
  Upload,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Admin_Dash_Menus = [
  {
    label: "carts",
    icon: <ShoppingCart size={18} />,
    goto: "/dashboard/user-cart",
  },
  {
    label: "all orders",
    icon: <Box size={18} />,
    goto: "/dashboard/user-order",
  },
  {
    label: "payment histories",
    icon: <CreditCard size={18} />,
    goto: "/dashboard/user-payment",
  },
  {
    label: "settings",
    icon: <Settings size={18} />,
    goto: "/dashboard/user-setting",
  },
];

const User_Dash_Menus = [
  {
    label: "manage orders",
    icon: <Box size={18} />,
    goto: "/dashboard/admin-order",
  },
  {
    label: "upload products",
    icon: <Upload size={18} />,
    goto: "/dashboard/admin-upload-product",
  },
  {
    label: "settings",
    icon: <Settings size={18} />,
    goto: "/dashboard/admin-setting",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <ul className="space-y-1 select-none">
        {User_Dash_Menus.map((menu, index) => (
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
        {Admin_Dash_Menus.map((menu, index) => (
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
