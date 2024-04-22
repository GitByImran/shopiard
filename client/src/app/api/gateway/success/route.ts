import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
const track = req.url.split("?")[1];
return NextResponse.redirect(
  new URL(`/payment/success?${track}`, req.url),
  303
);
};
