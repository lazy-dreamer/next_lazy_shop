"use client";
import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import { Preloader } from "../preloader/Preloader";
import { Title } from "../ui/title";
import { IProduct } from "../../app/page";
import { Api } from "../../services/api/api-client";
import { sortProductItems } from "../../services/sorting";
import { useSearchValues } from "@/hooks/use_search_values";
import { PaginatedProducts } from "@/components/paginated_products/paginated_products";
import { usePathname } from "next/navigation";

export const ShopProducts: React.FC = memo(() => {
  const [loading, setLoading] = useState(true);
  const [productItems, setProductItems] = useState<IProduct[] | undefined>();

  const { category, sort, price_min, price_max } = useSearchValues();
  const pathname = usePathname();

  const priceQuery = useMemo(
    () => `&price_min=${price_min}&price_max=${price_max}`,
    [price_min, price_max],
  );

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
    if (pathname.includes("/shop")) {
      fetchProducts(category);
    }
  }, [category, fetchProducts, sort, priceQuery]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : productItems == undefined ? (
        <Title size="md" text="Oops, something went wrong :(" />
      ) : productItems.length > 0 ? (
        <PaginatedProducts products={productItems} />
      ) : (
        <Title size="md" text="There are no products in this category :(" />
      )}
    </>
  );
});
