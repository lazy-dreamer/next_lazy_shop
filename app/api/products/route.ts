import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const products = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}products/`,
  );

  return NextResponse.json(products.data);
}
