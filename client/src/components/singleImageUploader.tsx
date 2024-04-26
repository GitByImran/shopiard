"use client";

import { CloudUpload, ImageMinus } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

const SingleImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setFileName(file.name);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        id="thumbnail_image"
        onChange={handleFileSelect}
        accept="image/*"
        multiple={false}
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <label htmlFor="thumbnail_image" className="flex-1 cursor-pointer">
          <p className="border p-2">
            <span className="border-r-2 pr-2 font-bold text-black/50">
              Choose File
            </span>{" "}
            <span>{fileName ? fileName : "No file chosen"}</span>
          </p>
        </label>
        <button className="flex items-center gap-1 border p-2 bg-cyan-600 text-white">
          <CloudUpload size={20} />
          Upload
        </button>
      </div>
      {selectedImage && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          <label
            htmlFor="thumbnail_image"
            title="change image"
            className="cursor-pointer"
          >
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 text-white">
              <ImageMinus />
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default SingleImageUploader;
