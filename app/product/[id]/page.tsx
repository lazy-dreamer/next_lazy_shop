import React from "react";
import {ProductFullBlock} from "../../../components/product_full_block/product_full_block";

export default function ShopPage({ params }: { params: { id: string } }) {
  return <section>
    <div className="screen_content">
      <ProductFullBlock productId={params.id} />
    </div>
  </section>
}