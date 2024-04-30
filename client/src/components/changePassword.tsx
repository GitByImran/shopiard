import { X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "./ui/use-toast";

const ChangePassword = ({ session }: any) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const handleOpenChangePasswordModal = () => {
    setMessage("");
    setOpenChangePasswordModal(!openChangePasswordModal);
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    console.log(session);

    try {
      const response = await fetch(
        `/api/database/user?email=${session.user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      toast({
        title: "Password change successful!!",
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpenChangePasswordModal(false);
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Failed to change password!!",
      });
    }
  };

  return (
    <div className="p-5 border-2 border-l-8 border-l-cyan-600 flex md:flex-row flex-col justify-between md:items-center items-start gap-5">
      <div>
        <h2 className="font-bold text-lg">Change Password</h2>

        <p className="text-sm">
          If you have forgot your password or if you want to set a new password,
          click on change password.
        </p>
      </div>

      <button
        onClick={handleOpenChangePasswordModal}
        className="min-w-max bg-white hover:bg-gray-100 hover:shadow text-black border font-semibold rounded py-1 px-4"
      >
        Change Password
      </button>
      {openChangePasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="relative max-w-[400px] mx-5 bg-white p-8 rounded">
            <button
              className="absolute right-2 top-2 text-slate-600"
              onClick={() => setOpenChangePasswordModal(false)}
            >
              <X size={20} />
            </button>
            <form
              className="flex flex-col gap-2 items-start p-2"
              onSubmit={handleChangePassword}
            >
              <h2 className="mb-4 font-bold text-slate-600">Change Password</h2>

              <input
                type="password"
                placeholder="Old password"
                className="w-full border py-1 px-3 outline-cyan-600"
                required={true}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full border py-1 px-3 outline-cyan-600"
                required={true}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full border py-1 px-3 outline-cyan-600"
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {message && <p className="text-red-600 text-xs">{message}</p>}
              <button
                className="bg-cyan-600 hover:bg-cyan-800 text-white px-4 py-1 rounded"
                type="submit"
              >
                Save Change
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
