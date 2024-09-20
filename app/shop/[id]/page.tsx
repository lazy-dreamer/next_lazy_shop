import React from "react";
import {Shop} from "../../../components/shop/shop";

export default function ShopPage({ params }: { params: { id: string } }) {
  return <>
    <Shop category={params.id} />
  </>
}