'use client';
import React, {useCallback, useEffect, useState, memo} from "react";
import {Preloader} from "../preloader/Preloader";
import {ProductBlock} from "../product_block/product_block";
import {Title} from "../ui/title";
import {IProduct} from "../../app/page";
import {Api} from "../../services/api-client";
import {sortProductItems} from "../../services/sorting";

interface Props {
  category: string | string[],
  sort: string,
  priceQuery: string
}

export const ShopProducts:React.FC<Props> = memo(({category, sort, priceQuery}) => {
  const [loading, setLoading] = useState(true);
  const [productItems, setProductItems] = useState<IProduct[] | undefined>();

  const fetchProducts = useCallback(async (categoryId: string | string[]) => {
    setLoading(true);
    
    let reqParam:string = categoryId !== 'all' ? `?categoryId=${categoryId}${priceQuery}` : `?${priceQuery}`;
    
    const products:IProduct | IProduct[] = await Api.products.search(reqParam).then((data) => sortProductItems(data, sort));
    
    setProductItems(products);
    setLoading(false);
  }, [priceQuery, sort, category]);

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts, priceQuery, sort]);
  
  return <>
    {loading ? (
      <Preloader />
    ) : (
      productItems && productItems.length > 0 ? (
        <div className="triple_blocks">
          {productItems.map(prod => (
            <ProductBlock key={prod.id} productItem={prod} />
          ))}
        </div>
      ) : (
        <Title size="md" text="There are no products in this category :(" />
      )
    )}
  </>;
})
