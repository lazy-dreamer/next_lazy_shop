import React from "react";
import {Api} from "../../../../services/api/api-client";

export default async function ProductPageModal({ params }: { params: { id: string } }) {
  let product = await Api.products.product(params.id);
  const featuredProducts = await Api.products.search(`?categoryId=${product.category.id}`).then(data => data.slice(0,10))
  
  return <section>
    <div className="screen_content">
      {/*<ProductFullBlock product={product} />*/}
      <p>{params.id}</p>
      {/*{product.id != 696969 && <ProductsSlider title={'Featured items'} blocks={featuredProducts} />}*/}
    </div>
  </section>
}