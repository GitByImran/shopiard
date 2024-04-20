import React from "react";

const BuyNowPopup = ({ showModal, setShowModal, product }: any) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="max-w-[400px] mx-5 bg-white p-8 rounded shadow-lg">
        <h2 className="text-md font-bold mb-2">
          Are you sure you want to buy it?
        </h2>
        <p className="text-sm mb-4">
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="text-sm px-4 py-2 rounded"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button className="bg-slate-800 text-white text-sm px-5 py-2 rounded">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPopup;
