import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import ProductModel, { IProduct } from "@/models/product";

export const POST = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const requestData = await request.json();

    if (!requestData || typeof requestData !== "object") {
      throw new Error("Invalid request body");
    }

    // Create a new product document using the ProductModel
    const newProduct = new ProductModel(requestData);

    // Save the new product document to the database
    const savedProduct = await newProduct.save();

    return NextResponse.json({ success: true, data: savedProduct });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
