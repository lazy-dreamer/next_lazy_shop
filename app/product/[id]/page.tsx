import React from "react";
import {ProductFullBlock} from "../../../components/product_full_block/product_full_block";
import {Api} from "../../../services/api-client";
import {ProductsSlider} from "../../../components/products_slider/products_slider";

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = await Api.products.product(params.id);
  const featuredProducts = await Api.products.search(`?categoryId=${product.category.id}`).then(data => data.slice(0,10))
  
  return <section>
    <div className="screen_content">
      <ProductFullBlock product={product} />
      {product.id != 696969 && <ProductsSlider title={'Featured items'} blocks={featuredProducts} />}
    </div>
  </section>
}