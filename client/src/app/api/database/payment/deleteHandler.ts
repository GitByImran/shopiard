import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import PaymentModel, { IPayment } from "@/models/payment";
import { parse } from "querystring";

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "DELETE") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const query = request.url.split("?")[1];
    const queryParams = parse(query || "");

    const { trxId } = queryParams;

    console.log("trxId", trxId);

    if (!trxId || typeof trxId !== "string") {
      return NextResponse.json({
        success: false,
        error: "Invalid trxId provided in the query",
      });
    }

    const deletedPayment: IPayment | null = await PaymentModel.findOneAndDelete(
      {
        trxID: trxId,
      }
    );

    if (!deletedPayment) {
      return NextResponse.json({
        success: false,
        error: "Payment with the provided trxId not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
