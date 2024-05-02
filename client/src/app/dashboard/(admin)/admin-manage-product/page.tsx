"use client";

import { IProduct } from "@/models/product";
import { Eye, PenSquare, SquarePen, Tag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingButton from "@/components/loading-button";
import {
  useDeleteProduct,
  useGetProducts,
} from "../../../../../lib/QueryAndMutation";

const AdminManageProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, isSuccess } = useGetProducts();
  const { mutate: deleteProductMutation } = useDeleteProduct();

  useEffect(() => {
    setProducts(data);
  }, [data, isSuccess]);

  const handlePreview = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin-upload-product?id=${id}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      deleteProductMutation(productId);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingButton />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products &&
          products.map((item: IProduct, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden sm:block flex "
            >
              <div className="sm:h-[20vh] sm:w-full h-full min-w-[100px] w-[100px] overflow-hidden relative">
                <img
                  src={item.thumbnailImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                {item.discountPercentage > 0 && (
                  <p className="absolute top-0 right-0 py-1 px-2 rounded-s flex items-center gap-1 bg-cyan-800 text-white text-xs font-semibold">
                    {item.discountPercentage}%{" "}
                    <span className="sm:block hidden">discount</span>
                  </p>
                )}
              </div>
              <div className="p-2 w-full">
                <div>
                  <p className="text-xs flex items-center gap-1 capitalize">
                    <Tag size={10} />
                    {item.brand}
                  </p>
                </div>
                <h2 className="font-semibold sm:truncate">{item.title}</h2>
                <div className="mt-4 min-w-[100%] flex items-center !justify-between">
                  <p className="text-xs font-medium">BDT. {item.price}</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handlePreview(item._id)}>
                      <Eye size={18} />
                    </button>
                    <button onClick={() => handleEdit(item._id)}>
                      <PenSquare size={16} />
                    </button>
                    <button onClick={() => setShowModal(true)}>
                      <Trash size={16} />
                    </button>
                    {showModal && (
                      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50">
                        <div className="max-w-[400px] mx-5 bg-white p-8 rounded">
                          <h2 className="text-md font-bold mb-2">
                            Are you sure you want to delete this product ?
                          </h2>
                          <p className="text-sm mb-4">
                            This action cannot be undone. This will permanently
                            delete your product and remove product data from
                            database.
                          </p>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setShowModal(false)}
                              className="text-sm px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="bg-slate-800 text-white text-sm px-5 py-2 rounded"
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminManageProductPage;
