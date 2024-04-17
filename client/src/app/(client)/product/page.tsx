import Link from "next/link";
import React from "react";

const Product = () => {
  return (
    <div className="container">
      products <Link href={"/product/1"}>1</Link>
    </div>
  );
};

export default Product;
