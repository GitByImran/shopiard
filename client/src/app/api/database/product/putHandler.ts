import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import ProductModel, { IProduct } from "@/models/product";
import { parse } from "querystring";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "PUT") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }
  await connect();

  try {
    const query = request.url.split("?")[1];
    const queryParams = parse(query || "");

    const { id } = queryParams;

    console.log("id", id);

    if (!id || typeof id !== "string") {
      return NextResponse.json({
        success: false,
        error: "Invalid id provided in the query",
      });
    }

    const {
      brand,
      category,
      title,
      price,
      discountPercentage,
      stock,
      thumbnailImage,
      galleryImages,
      description,
    } = await request.json();

    const existingProduct = await ProductModel.findById(id);

    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    existingProduct.brand = brand;
    existingProduct.category = category;
    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.discountPercentage = discountPercentage;
    existingProduct.stock = stock;
    existingProduct.thumbnailImage = thumbnailImage;
    existingProduct.galleryImages = galleryImages;
    existingProduct.description = description;

    await existingProduct.save();

    return NextResponse.json({ success: true, data: existingProduct });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
