import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import ProductModel, { IProduct } from "@/models/product";

export const GET = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "GET") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const products: IProduct[] = await ProductModel.find({});

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
