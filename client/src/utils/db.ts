import mongoose from "mongoose";

export const connect = async () => {
  // if (mongoose.connections[0].readyState) return;

  try {
    await mongoose
      .connect(process.env.NEXT_PUBLIC_MONGODB_URI!)
      .then((response) => console.log(response))
      .then(() => console.log("connected"));
  } catch (error) {
    console.log("unable to connect database");
  }
};
