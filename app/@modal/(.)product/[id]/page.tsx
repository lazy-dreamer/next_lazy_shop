import React from "react";
import {Api} from "../../../../services/api/api-client";
import {ModalOverlay} from "../../../../components/modal_overlay/modal_overlay";
import {ProductFullBlock} from "../../../../components/product_full_block/product_full_block";
import {IProduct} from "../../../page";

export default async function ProductPageModal({ params }: { params: { id: string } }) {
  // @ts-ignore
  let product:IProduct = await Api.products.product(params.id);
  
  return <ModalOverlay className={'top_overlay'}>
    <div className="screen_content">
      <ProductFullBlock product={product} withClose={true} />
    </div>
  </ModalOverlay>
}