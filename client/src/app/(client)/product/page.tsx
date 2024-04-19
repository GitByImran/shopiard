"use client";

import ProductCard from "@/components/productCard";
import { getProducts } from "@/lib/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData.products);
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        {products
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-1 bg-cyan-600 text-white rounded hover:bg-cyan-800 disabled:bg-gray-300"
        >
          <ChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`h-6 w-6 rounded-full flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-800 ${
                currentPage === page ? "bg-cyan-700 !h-8 !w-8" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-1 bg-cyan-600 text-white rounded hover:bg-cyan-800 disabled:bg-gray-300"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Product;
