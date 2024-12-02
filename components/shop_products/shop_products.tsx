"use client";
import React, { useCallback, useEffect, useState, memo } from "react";
import { Preloader } from "../preloader/Preloader";
import { ProductBlock } from "../product_block/product_block";
import { Title } from "../ui/title";
import { IProduct } from "../../app/page";
import { Api } from "../../services/api/api-client";
import { sortProductItems } from "../../services/sorting";
import s from "./shop_products.module.scss";
import { useSearchParams } from "next/navigation";

interface Props {
  sort: string;
  priceQuery: string;
}

export const ShopProducts: React.FC<Props> = memo(({ sort, priceQuery }) => {
  const [loading, setLoading] = useState(true);
  const [productItems, setProductItems] = useState<IProduct[] | undefined>();

  const searchParams = useSearchParams();
  const category: string | null = searchParams.get("id")
    ? searchParams.get("id")
    : "all";
  // console.log("searchParams is - ", searchParams);
  console.log(category);

  const fetchProducts = useCallback(
    async (categoryId: string | string[] | null) => {
      setLoading(true);
      let reqParam: string =
        categoryId !== "all"
          ? `?categoryId=${categoryId}${priceQuery}`
          : `?${priceQuery}`;
      try {
        const products: IProduct[] = await Api.products
          .search(reqParam)
          .then((data) => sortProductItems(data, sort));
        setProductItems(products);
      } catch (e: any) {
        console.error(`Uncaught Error: ${e.message}`);
      }
      setLoading(false);
    },
    [priceQuery, sort, category],
  );

  useEffect(() => {
    fetchProducts(category);
  }, [category, fetchProducts, priceQuery, sort]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : productItems == undefined ? (
        <Title size="md" text="Oops, something went wrong :(" />
      ) : productItems.length > 0 ? (
        <div className={`${s.output_blocks} triple_blocks`}>
          {productItems.map((prod) => (
            <ProductBlock key={prod.id} productItem={prod} />
          ))}
        </div>
      ) : (
        <Title size="md" text="There are no products in this category :(" />
      )}
    </>
  );
});
