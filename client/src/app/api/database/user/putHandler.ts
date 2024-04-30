import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import UserModel, { IUser } from "@/models/user";
import bcrypt from "bcrypt";

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

    const { email, name, image, oldPassword, newPassword } = requestData;

    if (!email || typeof email !== "string") {
      throw new Error("Invalid email provided in the request body");
    }

    const user: IUser | null = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    if (oldPassword && newPassword) {
      // Change password
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);

      if (!passwordMatch) {
        return NextResponse.json({
          success: false,
          error: "Old password does not match",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
    } else {
      // Update user profile
      if (name) user.name = name;
      if (image) user.image = image;
    }

    const updatedUser = await user.save();

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
