import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import PaymentModel, { IPayment } from "@/models/payment";

export const POST = async (request: NextRequest, response: NextResponse) => {
  await connect();

  try {
    const requestData = await request.json();

    if (!requestData || typeof requestData !== "object") {
      throw new Error("Invalid request body");
    }

    const { information, trxId, status, gw } = requestData;

    const existingPayment = await PaymentModel.findOne({ trxID: trxId });

    if (existingPayment) {
      console.log("data found with same trxid");
      return NextResponse.json({
        success: false,
        error: "Payment with the same trxId already exists",
      });
    } else {
      const payment = new PaymentModel({
        information: information,
        trxID: trxId,
        status: status,
        gw: gw,
      });

      console.log("requestData", requestData);
      console.log("payment", payment);

      const savedPayment: IPayment = await payment.save();

      return NextResponse.json({ success: true, data: savedPayment });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
