'use client';
import React, {useCallback, useEffect, useState} from "react";
import {Preloader} from "../preloader/Preloader";
import {ProductBlock} from "../product_block/product_block";
import {Title} from "../ui/title";
import {IPoduct} from "../../app/page";
import {Api} from "../../services/api-client";
import {useSearchParams} from "next/navigation";

interface Props {
  category: string | string[],
  sort: string,
  priceQuery: string
}

export const ShopProducts:React.FC<Props> = ({category, sort, priceQuery}) => {
  const [loading, setLoading] = useState(true);
  const [productItems, setProductItems] = useState<IPoduct[]>();
  const searchParams = useSearchParams();
  
  console.log(priceQuery)

  // Завантаження продуктів, коли змінюється категорія
  const fetchProducts = useCallback(async (categoryId: string | string[]) => {
    setLoading(true);
    let reqParam = categoryId !== 'all' ? `?categoryId=${categoryId}` : '';
    const products = await Api.products.search(reqParam);
    setProductItems(products);
    setLoading(false);
  }, []);

  // Викликаємо завантаження продуктів, коли змінюється URL категорії
  useEffect(() => {
    const myParam = searchParams.get("limit");
    // console.log(myParam)
    fetchProducts(category);
  }, [category, fetchProducts]);
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
}
