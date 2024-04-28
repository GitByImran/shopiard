"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/models/product";
import MultipleImageUploader from "@/components/multipleImageUploader";
import SingleImageUploader from "@/components/singleImageUploader";
import RichTextEditor from "@/utils/richTextEditor";

interface FormData {
  brand: string;
  category: string;
  title: string;
  price: string;
  discountPercentage: string;
  stock: string;
  thumbnailImage: string;
  galleryImages: never[];
  description: string;
}

const AdminUploadProductForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    title: "",
    price: "",
    discountPercentage: "",
    stock: "",
    thumbnailImage: "",
    galleryImages: [],
    description: "",
  });

  const [formValid, setFormValid] = useState(false);
const [productId, setProductId] = useState<string>("");

// Fetch products and find the specific product if ID is provided
const fetchProductsAndFind = async (productId: string) => {
  try {
    setProductId(productId);
    const response = await fetch("/api/database/product", {
      method: "GET",
    });
    if (response.ok) {
      const products = await response.json();
      const product = products.data.find(
        (product: IProduct) => product._id === productId
      );
      if (product) {
        setFormData(product);
        setFormValid(true);
      } else {
        console.error("Product not found.");
      }
    } else {
      console.error("Error fetching products:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

useEffect(() => {
  const id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    fetchProductsAndFind(id);
  }
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log(formData);

  try {
    const url = productId
      ? `/api/database/product?id=${productId}`
      : "/api/database/product";
    const method = productId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log(
        "Product",
        productId ? "updated" : "uploaded",
        "successfully!"
      );
      setFormData({
        ...formData,
        brand: "",
        title: "",
        price: "",
        discountPercentage: "",
        stock: "",
        thumbnailImage: "",
        galleryImages: [],
        description: "",
      });
      setFormValid(false);
    } else {
      console.error(
        "Error",
        productId ? "updating" : "uploading",
        "product:",
        response.statusText
      );
    }
  } catch (error) {
    console.error(
      "Error",
      productId ? "updating" : "uploading",
      "product:",
      error
    );
  }
};

// Update form data on input change
const handleChange = (e: any) => {
  const { name, value } = e.target;
  console.log("name :", name, "value :", value);
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
  checkFormValidity();
};

// Update thumbnail image URL
const handleThumbnailImageUpload = (imageUrl: string) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    thumbnailImage: imageUrl,
  }));
  checkFormValidity();
};

// Update gallery images URLs
const handleGalleryImagesUpload = (imageUrls: string[]) => {
  setFormData((prevFormData: any) => ({
    ...prevFormData,
    galleryImages: imageUrls,
  }));
  checkFormValidity();
};

// Update rich text editor content
const handleRichTextEditorChange = (content: string) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    description: content,
  }));
  checkFormValidity();
};

// Check form validity
const checkFormValidity = () => {
  const requiredFields: (keyof FormData)[] = [
    "brand",
    "category",
    "title",
    "price",
    "stock",
    "description",
  ];

  const isRequiredFieldsFilled = requiredFields.every(
    (field: keyof FormData) => formData[field]
  );

  const isImageUploaded =
    formData.thumbnailImage || formData.galleryImages.length > 0;
  setFormValid(isRequiredFieldsFilled && isImageUploaded ? true : false);
};

return (
  <Suspense fallback={<div>Loading...</div>}>
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <h2 className="font-bold text-slate-600">Thumbnail Image</h2>
          <SingleImageUploader
            onUpload={handleThumbnailImageUpload}
            existingImage={productId ? formData.thumbnailImage : null}
          />
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-slate-600">Gallery Images</h2>
          <MultipleImageUploader
            onUpload={handleGalleryImagesUpload}
            existingImages={productId ? formData.galleryImages : []}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <select
          name="category"
          id="category"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.category}
        >
          <option value="">select the product category</option>
          {[
            "smartphones",
            "laptops",
            "fragrances",
            "skincare",
            "groceries",
            "home-decoration",
          ].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          name="brand"
          id="brand"
          placeholder="enter the product brand"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.brand}
        />

        <input
          type="text"
          name="title"
          placeholder="enter the product name"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.title}
        />

        <input
          type="number"
          name="price"
          placeholder="enter the product price"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.price}
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="enter the discount price (0 for no-discount)"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.discountPercentage}
        />

        <input
          type="number"
          name="stock"
          placeholder="enter the stock amount"
          className="border border-slate-300 focus-visible:outline-slate-600 p-2"
          onChange={handleChange}
          value={formData.stock}
        />
        <div className="col-span-3">
          <RichTextEditor
            value={formData.description}
            onChange={handleRichTextEditorChange}
          />
        </div>
      </div>
      {!productId ? (
        <button
          className={`sm:w-fit w-full px-10 py-2 bg-cyan-600 text-white ${
            !formValid && "cursor-not-allowed bg-gray-500"
          }`}
          type="submit"
          disabled={!formValid}
        >
          Submit
        </button>
      ) : (
        <button
          className={`sm:w-fit w-full px-10 py-2 bg-cyan-600 text-white ${
            !formValid && "cursor-not-allowed bg-gray-500"
          }`}
          type="submit"
          disabled={!formValid}
        >
          Update
        </button>
      )}
    </form>
  </Suspense>
);
};

export default AdminUploadProductForm;
