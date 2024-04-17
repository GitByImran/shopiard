"use client";

import React, { useState, useEffect } from "react";

const getProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Featured Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {products.slice(0, 8).map((product: any) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
