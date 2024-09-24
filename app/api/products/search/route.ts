import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  // console.log(query)
  const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products/${query}`);
  
  return NextResponse.json(products.data)
}