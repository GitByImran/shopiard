import Link from "next/link";
import React from "react";

const Product = () => {
  return (
    <div>
      products <Link href={"/product/1"}>1</Link>
    </div>
  );
};

export default Product;
