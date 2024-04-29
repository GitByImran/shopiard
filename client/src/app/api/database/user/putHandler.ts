import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import UserModel, { IUser } from "@/models/user";

export const PUT = async (request: NextRequest, response: NextResponse) => {
  if (request.method !== "PUT") {
    return NextResponse.json({ message: "Method Not Allowed" });
  }

  await connect();

  try {
    const requestData = await request.json();

    if (!requestData || typeof requestData !== "object") {
      throw new Error("Invalid request body");
    }

    // Extract data from the request body
    const { email, name, image }: Partial<IUser> = requestData;

    console.log(
      "requested data : ---------------------------------------",
      requestData
    );

    if (!email || typeof email !== "string") {
      throw new Error("Invalid email provided in the request body");
    }

    // Find the user by email
    const user: IUser | null = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    // Update user fields if provided in the request body
    if (name) user.name = name;
    if (image) user.image = image;

    // Save the updated user
    const updatedUser = await user.save();

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
