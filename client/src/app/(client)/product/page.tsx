"use client";

import LoadingButton from "@/components/loading-button";
import ProductCard from "@/components/productCard";
import { getProducts } from "@/lib/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetProducts } from "../../../../lib/QueryAndMutation";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { data, isLoading, isError, isSuccess } = useGetProducts();

  useEffect(() => {
    setProducts(data);
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="container">
        <LoadingButton />
      </div>
    );
  }

  if (isError) {
    return <div className="container">Falied to get user data!</div>;
  }

  const totalProducts = products?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else if (currentPage <= 2) {
      return [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  console.log(products);

  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        {products &&
          products
            .slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage
            )
            .map((product: any) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`h-8 w-8 p-1 rounded flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-800 ${
            currentPage === 1
              ? "bg-gray-300 cursor-default hover:bg-gray-300"
              : ""
          }`}
        >
          <ChevronLeft />
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`h-6 w-6 p-1 rounded-full flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-800 ${
              currentPage === page ? "bg-cyan-700 !h-8 !w-8" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`h-8 w-8 p-1 rounded flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-800 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-default hover:bg-gray-300"
              : ""
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Product;