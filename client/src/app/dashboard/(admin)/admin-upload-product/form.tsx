"use client";

import MultipleImageUploader from "@/components/multipleImageUploader";
import SingleImageUploader from "@/components/singleImageUploader";
import RichTextEditor from "@/utils/richTextEditor";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IProduct } from "@/models/product";

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

const formData: FormData = {
  brand: "",
  category: "",
  title: "",
  price: "",
  discountPercentage: "",
  stock: "",
  thumbnailImage: "",
  galleryImages: [],
  description: "",
};

const AdminUploadProductForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log(id);

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name :", name, "value :", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    checkFormValidity();
  };

  const handleThumbnailImageUpload = (imageUrl: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      thumbnailImage: imageUrl,
    }));
    checkFormValidity();
  };

  const handleGalleryImagesUpload = (imageUrls: string[]) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      galleryImages: imageUrls,
    }));
    checkFormValidity();
  };

  const handleRichTextEditorChange = (content: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: content,
    }));
    checkFormValidity();
  };

  useEffect(() => {
    if (id) {
      fetchProductsAndFind(id);
    }
  }, [!id === null]);

  const fetchProductsAndFind = async (productId: string) => {
    try {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("/api/database/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Product uploaded successfully!");
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
        console.error("Error uploading product:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={`space-y-2`}>
            <h2 className="font-bold text-slate-600">Thumbnail Image</h2>
            <SingleImageUploader
              onUpload={handleThumbnailImageUpload}
              id={id}
            />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-slate-600">Gallery Images</h2>
            <MultipleImageUploader
              onUpload={handleGalleryImagesUpload}
              id={id}
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
        <button
          className={`sm:w-fit w-full px-10 py-2 bg-cyan-600 text-white ${
            !formValid && "cursor-not-allowed bg-gray-500"
          }`}
          type="submit"
          disabled={!formValid}
        >
          Submit
        </button>
      </form>
    </Suspense>
  );
};

export default AdminUploadProductForm;
