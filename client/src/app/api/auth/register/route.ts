import UserModel from "@/models/user";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  await connect();

  try {
    const { name, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(name, email, hashedPassword);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("user created", newUser);

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.log("Error:", error);
    return error;
  }
};
