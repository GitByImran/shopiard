import { NextResponse } from "next/server";

interface PaymentRequestBody {
  amount: number;
  cart: any;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { tran_id, totalPrice, formData: userData } = body;
    console.log("userData", userData);
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const formData = new FormData();
    formData.append("store_id", "shopi6623a26b9af0a");
    formData.append("store_passwd", "shopi6623a26b9af0a@ssl");
    formData.append("total_amount", totalPrice);
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);
    formData.append(
      "success_url",
      `http://localhost:3000/api/gateway/success?id=${tran_id}`
    );
    formData.append(
      "fail_url",
      `http://localhost:3000/api/gateway/fail?id=${tran_id}`
    );
    formData.append(
      "cancel_url",
      `http://localhost:3000/api/gateway/cancel?id=${tran_id}`
    );
    formData.append(
      "ipn_url",
      `http://localhost:3000/api/gateway/ipn?id=${tran_id}`
    );
    formData.append("shipping_method", "Courier");
    formData.append("product_name", "Computer.");
    formData.append("product_category", "Electronic");
    formData.append("product_profile", "general");
    formData.append("cus_name", userData?.name);
    formData.append("cus_email", userData?.name);
    formData.append("cus_add1", "Dhaka");
    formData.append("cus_add2", "");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_state", "Dhaka");
    formData.append("cus_postcode", "1000");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", "01711111111");
    formData.append("cus_fax", "01711111111");
    formData.append("ship_name", "Customer Name");
    formData.append("ship_add1", "Dhaka");
    formData.append("ship_add2", "Dhaka");
    formData.append("ship_city", "Dhaka");
    formData.append("ship_state", "Dhaka");
    formData.append("ship_postcode", "4000");
    formData.append("ship_country", "Bangladesh");

    const requestOptions = { method: "POST", body: formData };
    let SSLResponse = await fetch(init_url, requestOptions);
    let SSLResponseJson = await SSLResponse.json();
    return NextResponse.json({ data: SSLResponseJson });
  } catch (error) {
    return NextResponse.json(error);
  }
};

//const store_id = "shopi6623a26b9af0a";
//const store_passwd = "shopi6623a26b9af0a@ssl";
//const is_live = false; //true for live, false for sandbox
//https://shopiard.vercel.app/