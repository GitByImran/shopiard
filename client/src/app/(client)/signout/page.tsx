import { signOut } from "next-auth/react";
import React, { useState } from "react";

const SignOutPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="hover:bg-cyan-600 hover:text-white font-medium w-full px-2 py-1 border rounded"
      >
        Sign Out
      </button>

      {/* logout confirmation modal */}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="max-w-[400px] mx-5 bg-white p-8 rounded shadow-lg">
            <h2 className="text-md font-bold mb-2">
              Are you sure you want to sign out?
            </h2>
            <p className="text-sm mb-4">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
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

export default SignOutPage;
