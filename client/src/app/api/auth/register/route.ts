import UserModel from "@/models/user";
import { connect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  await connect();

  try {
    const { name, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Email already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name, email, hashedPassword);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      image: "",
      isAdmin: false,
    });
    await newUser.save();
    console.log("user created", newUser);

    return new NextResponse(
      JSON.stringify({ message: "Success" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
