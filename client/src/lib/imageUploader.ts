const uploadImageToImgBB = async (imageData: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageData);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=f6b7ed31eea5a21e9e00f71286c18481",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.status}`);
    }

    const data = await response.json();
    return data.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageToImgBB;
