import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const DeleteAccount = ({ session }: any) => {
  const router = useRouter();
  const [showAccountDeleteModal, setShowAccountDeleteModal] =
    useState<boolean>(false);

  const handleOpenAccountDeleteModal = () => {
    setShowAccountDeleteModal(!showAccountDeleteModal);
  };

  const handleDeleteAccount = async (email: string) => {
    try {
      const response = await fetch(`/api/database/user?email=${email}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: "Error deleting account!!",
        });
        throw new Error(data.error);
      } else {
        toast({
          title: "Password change successful!!",
        });
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error deleting account!!",
      });
    }
  };

  return (
    <div className="p-5 border-2 border-l-8 border-l-cyan-600 flex md:flex-row flex-col justify-between md:items-center items-start gap-5">
      <div>
        <h2 className="font-bold text-lg">Delete Account</h2>
        <p className="text-sm">
          If you delete your account, all your payments, orders, and other
          documents will be deleted. Deleted data cannot be recovered.
        </p>
      </div>

      <button
        onClick={handleOpenAccountDeleteModal}
        className="min-w-max bg-white hover:bg-gray-100 hover:shadow text-black border font-semibold rounded py-1 px-4"
      >
        Delete Account
      </button>

      {showAccountDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="max-w-[400px] mx-5 bg-white p-8 rounded">
            <h2 className="text-md font-bold mb-2">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-sm mb-4">
              This action cannot be undone. It will permanently delete your
              account and all data from the database.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAccountDeleteModal(false)}
                className="text-sm px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAccount(session?.user?.email)}
                className="bg-slate-800 text-white text-sm px-5 py-2 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
