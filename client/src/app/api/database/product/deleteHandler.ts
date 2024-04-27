import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import ProductModel, { IProduct } from "@/models/product";
import { parse } from "querystring";

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "DELETE") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const query = request.url.split("?")[1];
    const queryParams = parse(query || "");

    const { id } = queryParams;

    console.log("trxId", id);

    if (!id || typeof id !== "string") {
      return NextResponse.json({
        success: false,
        error: "Invalid id provided in the query",
      });
    }

    const deletedProduct: IProduct | null = await ProductModel.findOneAndDelete(
      {
        _id: id,
      }
    );

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        error: "Product with the provided id not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
