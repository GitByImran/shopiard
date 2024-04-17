"use client";

import React, { useEffect } from "react";

const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};

const ProductSection = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      console.log(products);
    };
    fetchProducts();
  }, []);

  return <div>Loading products...</div>;
};

export default ProductSection;
