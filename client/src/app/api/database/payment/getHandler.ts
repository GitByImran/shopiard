import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import PaymentModel, { IPayment } from "@/models/payment";
import { parse } from "querystring";

export const GET = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "GET") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const query = request.url.split("?")[1];
    const queryParams = parse(query || "");

    const { email } = queryParams;

    console.log("email", email);

    if (!email || typeof email !== "string") {
      return NextResponse.json({
        success: false,
        error: "Invalid email provided in the query",
      });
    }

    const userPayments: IPayment[] = await PaymentModel.find({
      "information.email": email,
    });

    return NextResponse.json({ success: true, data: userPayments });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
