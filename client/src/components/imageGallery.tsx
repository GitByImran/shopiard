import React, { useState, useEffect } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ images }: any) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    console.log("Full screen mode:", isFullScreen);
  }, [isFullScreen]);

  const galleryImages = images.map((image: string) => ({
    original: image,
    thumbnail: image,

    renderItem: (item: any) => (
      <div className="image-gallery-image">
        <img
          src={item.original}
          alt=""
          style={{
            objectFit: "contain",
            padding: 20,
            height: `${isFullScreen ? "80vh" : "400px"}`,
            width: "100%",
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="">
      <ReactImageGallery items={galleryImages} />
      <style jsx global>{`
        .image-gallery-thumbnail-image {
          height: 80px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
