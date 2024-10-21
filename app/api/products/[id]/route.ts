import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const products = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}products/${id}`,
  );

  return NextResponse.json(products.data);
}
