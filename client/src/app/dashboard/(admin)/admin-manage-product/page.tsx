"use client";

import { IProduct } from "@/models/product";
import { Eye, PenSquare, SquarePen, Tag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const AdminManageProductPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const getProducts = await fetch("/api/database/product", {
      method: "GET",
    });
    const response = await getProducts.json();
    setProducts(response.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePreview = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin-upload-product?id=${id}`);
  };

  const handleDelete = (id: string) => {
    router.push(``);
  };

  if (!products) {
    return;
  }
  console.log(products);
  return (
    <div>
      {!products ? (
        <div>Loading Products ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((item: IProduct, index) => (
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
                    <button onClick={() => handleDelete(item._id)}>
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManageProductPage;
