"use client";

import React, { useState } from "react";
import { CloudUpload, ImageMinus, X } from "lucide-react";
import uploadImageToImgBB from "@/lib/imageUploader";

const SingleImageUploader = ({ onUpload }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setFileName("");
    setSelectedImage(null);
  };

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (selectedImage) {
      try {
        setUploading(true);
        const imageUrl = await uploadImageToImgBB(selectedImage);
        onUpload(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
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
      <div className={`flex items-center gap-2`}>
        <label htmlFor="thumbnail_image" className={`flex-1 cursor-pointer`}>
          <p className="border p-2">
            <span className="border-r-2 pr-2 font-bold text-black/50">
              Choose File
            </span>{" "}
            <span className="truncate">
              {fileName
                ? fileName.length > 30
                  ? fileName.substring(0, 10) + "..."
                  : fileName
                : "No file chosen"}
            </span>
          </p>
        </label>
        <button
          className="border p-2 bg-cyan-600 text-white"
          disabled={!selectedImage || uploading}
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
      {selectedImage && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-0 right-0 flex justify-center items-center w-full h-full bg-black/50 text-white"
            onClick={handleRemoveImage}
          >
            <X strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};
export default SingleImageUploader;
