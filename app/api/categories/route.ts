import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const categories = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}categories`,
  );

  return NextResponse.json(categories.data);
}
