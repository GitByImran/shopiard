import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import PaymentModel from "./models/payment";
const SSLCommerzPayment = require("sslcommerz-lts");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const store_id = "shopi6623a26b9af0a";
const store_passwd = "shopi6623a26b9af0a@ssl";
const is_live = false; //true for live, false for sandbox

const handlePaymentSuccess = async (req: Request, res: Response) => {
  try {
    console.log(req.params.trxID);
    // Your logic to handle payment success here
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server is connected.");
});

// Endpoint to create an order
app.post("/payments", async (req: Request, res: Response) => {
  try {
    const cartData = await req.body;
    const trxID = new ObjectId().toString();
    const data = {
      total_amount: cartData.amount,
      currency: "BDT",
      tran_id: trxID,
      success_url: "http://localhost:3000/payment/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: cartData.name,
      cus_email: cartData.email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ url: GatewayPageURL });
    const confirmedOrder = new PaymentModel({
      information: cartData,
      status: false,
      trxID: trxID,
    });
    await confirmedOrder.save();
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://shopiard:OjLZYwHN17zNvvmM@cluster0.vstpkfb.mongodb.net/shopiard?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("running in port http://localhost:5000");
    });
  })
  .catch((error) => {
    throw new Error("Unable to connect database!");
  });
