"use client";

import SignOutPage from "@/app/(client)/signout/page";
import { useCart } from "@/utils/cartContext";
import {
  CirclePlus,
  CircleCheck,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  UserCog,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Auth_Menus = [
  {
    label: "dashboard",
    icon: <LayoutDashboard size={18} />,
    goto: "/dashboard",
  },
  {
    label: "profile",
    icon: <UserRound size={18} />,
    goto: "",
  },
  {
    label: "carts",
    icon: <ShoppingCart size={18} />,
    goto: "",
  },
];

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart } = useCart();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(false);
  const authMenuRef = useRef<HTMLDivElement>(null);

  const handleShowAuthMenu = () => {
    setShowAuthMenu(!showAuthMenu);
  };

  const handleCloseAuthMenu = () => {
    setShowAuthMenu(false);
  };

  const handlePushToCart = () => {
    router.push("/dashboard/user-cart");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setShowAuthMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authMenuRef]);

  return (
    <div className="border-b w-full">
      <div className="container select-none py-4 flex justify-between items-center gap-5">
        <div className="logo">
          <Link href={"/"}>
            {" "}
            <h2 className="text-3xl font-extrabold">Shopiard</h2>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {session ? (
            <div className="relative" ref={authMenuRef}>
              <button
                onClick={handleShowAuthMenu}
                className="outline-none rounded-full"
              >
                <img
                  src="/dummy-avatar.png"
                  alt="dummy-avatar.png"
                  className="h-9 w-9 mt-1"
                />
              </button>
              {showAuthMenu && (
                <ul className="absolute right-0 p-4 min-w-[250px] border shadow-lg rounded-md bg-white z-10">
                  <h2 className="px-2 py-1 mb-4 text-lg font-bold flex items-center gap-2 capitalize">
                    <UserCog />
                    {session.user?.name}
                  </h2>
                  {Auth_Menus.map((menu, index) => (
                    <li
                      key={index}
                      className="w-full"
                      onClick={handleCloseAuthMenu}
                    >
                      <Link
                        href={menu.goto}
                        className="px-2 py-1 rounded text-md font-medium capitalize cursor-pointer hover:bg-cyan-600 hover:text-white w-full flex justify-between items-center"
                      >
                        {menu.label} {menu.icon}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <SignOutPage />
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link href={"/signin"} className="text-lg font-medium capitalize">
              Sign in
            </Link>
          )}
          <button className="relative" onClick={handlePushToCart}>
            <ShoppingCart className="hover:text-cyan-600" />
            <p className="absolute -top-3 left-3 flex items-center justify-center text-sm font-bold text-cyan-600">
              {isClient ? (cart.length > 9 ? "9+" : cart.length) : 0}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;