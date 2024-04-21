import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  return NextResponse.redirect(new URL("/payment/cencel", req.url), 303);
};
