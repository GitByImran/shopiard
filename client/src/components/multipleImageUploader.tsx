"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { CloudUpload, ImagePlus, X } from "lucide-react";
import uploadImageToImgBB from "@/lib/imageUploader";

const MultipleImageUploader = ({ onUpload, existingImages }: any) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      // If existing images are provided, set them as selected images
      setSelectedImages(existingImages);
    }
  }, [existingImages]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files) as File[];
      // Append newly selected files to the existing selected images
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedImages.length > 0) {
      setUploading(true);
      const uploadedImageUrls = [];
      for (const image of selectedImages) {
        try {
          const imageUrl = await uploadImageToImgBB(image);
          uploadedImageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      onUpload(uploadedImageUrls);
      setUploading(false);
    }
  };

  console.log(existingImages.length);

  return (
    <div className="space-y-4">
      <input
        type="file"
        id="gallery_images"
        onChange={handleFileSelect}
        accept="image/*"
        multiple
        className="hidden"
      />
      <div
        className={`flex items-center gap-2 ${
          existingImages.length < 1
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <label htmlFor="gallery_images" className={`flex-1 cursor-pointer`}>
          <p className="border p-2">
            <span className="border-r-2 pr-2 font-bold text-black/50">
              Choose Files
            </span>{" "}
            <span>{selectedImages.length} files chosen</span>
          </p>
        </label>
        <button
          className="flex items-center gap-1 border p-2 bg-cyan-600 text-white"
          disabled={selectedImages.length === 0}
          onClick={handleUpload}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <span className="flex items-center gap-1 ">
              <CloudUpload size={20} />
              Upload
            </span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Render existing images */}
        {existingImages.length > 1 &&
          existingImages.map((image: string, index: number) => (
            <div
              key={index}
              className="w-20 h-20 border rounded-lg overflow-hidden opacity-50"
            >
              <img
                src={image}
                alt={`Existing ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        {/* Render selected images */}
        {existingImages.length < 1 &&
          selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative w-20 h-20 border rounded-lg overflow-hidden"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 text-white"
                onClick={() => handleRemoveImage(index)}
              >
                <X strokeWidth={3} />
              </button>
            </div>
          ))}
        {selectedImages.length > 0 && (
          <div className="relative w-20 h-20 border rounded-lg overflow-hidden">
            <label
              htmlFor="gallery_images"
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
            >
              <ImagePlus strokeWidth={2} stroke="blue" />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
export default MultipleImageUploader;
