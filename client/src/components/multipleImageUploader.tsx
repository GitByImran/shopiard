"use client";

import React, { useState, ChangeEvent } from "react";
import { CloudUpload, ImagePlus, X } from "lucide-react";

const MultipleImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      const urls = Array.from(files).map((file: File) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [...prevImages, ...urls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

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
      <div className="flex items-center gap-2">
        <label htmlFor="gallery_images" className="flex-1 cursor-pointer">
          <p className="border p-2">
            <span className="border-r-2 pr-2 font-bold text-black/50">
              Choose File
            </span>{" "}
            <span>
              {selectedImages ? selectedImages.length : 0} file chosen
            </span>
          </p>
        </label>
        <button className="flex items-center gap-1 border p-2 bg-cyan-600 text-white">
          <CloudUpload size={20} />
          Upload
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedImages.map((imageUrl, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-lg overflow-hidden"
          >
            <img
              src={imageUrl}
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
        {selectedImages.length >= 1 && (
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
