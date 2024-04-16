"use client";

import { LogOut, ShoppingCart, UserCog, UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Auth_Menus = [
  {
    label: "profile",
    icon: <UserRound size={18} />,
    goto: "/signin",
  },
  {
    label: "carts",
    icon: <ShoppingCart size={18} />,
    goto: "",
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);

  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(false);
  const authMenuRef = useRef<HTMLDivElement>(null);

  const handleShowAuthMenu = () => {
    setShowAuthMenu(!showAuthMenu);
  };

  const handleCloseAuthMenu = () => {
    setShowAuthMenu(false);
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
    <div>
      <div className="container flex justify-between items-center gap-5 p-4 border-b">
        <div className="logo">
          <h2 className="text-3xl font-extrabold">Shopiard</h2>
        </div>
        <div className="flex items-center gap-5">
          {session ? (
            <div className="relative" ref={authMenuRef}>
              <button
                onClick={handleShowAuthMenu}
                className="outline-none rounded-full"
              >
                <Image
                  src={"/dummy-avatar.png"}
                  alt=""
                  height={30}
                  width={30}
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
                        className="px-2 py-1 rounded text-md font-medium capitalize hover:bg-cyan-600 hover:text-white w-full flex justify-between items-center"
                      >
                        {menu.label} {menu.icon}
                      </Link>
                    </li>
                  ))}
                  <button
                    className="mt-2 px-2 py-1 rounded border hover:border-cyan-600 hover:bg-cyan-600 hover:!text-white w-full text-md font-medium capitalize"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    <span className="">Sign out</span>
                  </button>
                </ul>
              )}
            </div>
          ) : (
            <Link href={"/signin"} className="text-lg font-medium capitalize">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
