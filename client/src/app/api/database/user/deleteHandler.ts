import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { parse } from "querystring";
import UserModel, { IUser } from "@/models/user";

export const DELETE = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "DELETE") {
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

    const existedUser: IUser | null = await UserModel.findOneAndDelete({
      email: email,
    });

    if (!existedUser) {
      return NextResponse.json({
        success: false,
        error: "User with the provided email not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
