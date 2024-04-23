import React from "react";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div>
      <div className="container flex gap-10 my-10">
        <div className="border rounded-md p-4">
          <Sidebar />
        </div>
        <main className="flex-1 select-none overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
