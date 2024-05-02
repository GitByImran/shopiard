import React from "react";
import Sidebar from "@/components/sidebar";
import Bottombar from "@/components/bottombar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="">
      <div className="container gap-10 my-10 sm:flex hidden">
        <div className="border rounded-md p-4">
          <Sidebar />
        </div>
        <main className="flex-1 select-none overflow-auto">{children}</main>
      </div>
      <div className="flex flex-col justify-between sm:hidden min-h-[90vh]">
        <main className="mx-5 my-5 flex-1 select-none overflow-auto">
          {children}
        </main>
        <div className="py-3 sticky z-50 bottom-0 border-t-2 w-full bg-white">
          <Bottombar />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
