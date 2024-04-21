import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  console.log(res);
  return NextResponse.redirect(new URL("/payment/success", req.url), 303);
};
