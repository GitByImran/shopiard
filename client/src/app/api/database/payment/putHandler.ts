import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import PaymentModel, { IPayment } from "@/models/payment";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  await connect();

  try {
    const requestData = await request.json();

    if (!requestData || typeof requestData !== "object") {
      throw new Error("Invalid request body");
    }

    const { trxId, status, gw } = requestData;

    const existingPayment = await PaymentModel.findOne({ trxID: trxId });

    console.log(trxId);

    if (!existingPayment) {
      return NextResponse.json({
        success: false,
        error: "Payment with the provided trxId not found",
      });
    }

    existingPayment.status = status;

    existingPayment.set("gw", gw);

    const updatedPayment: IPayment = await existingPayment.save();

    return NextResponse.json({ success: true, data: updatedPayment });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
