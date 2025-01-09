"use client";
import React, { memo, useMemo } from "react";
import { Preloader } from "../preloader/Preloader";
import { Title } from "../ui/title";
import { IProduct } from "@/app/page";
import { Api } from "@/services/api/api-client";
import { sortProductItems } from "@/services/utils/sorting";
import { useSearchValues } from "@/hooks/use_search_values";
import { PaginatedProducts } from "@/components/paginated_products/paginated_products";
import { useQuery } from "@tanstack/react-query";

export const ShopProducts: React.FC = memo(() => {
  const { category, sort, price_min, price_max, paramsString } =
    useSearchValues();

  const priceQuery = useMemo(
    () => `&price_min=${price_min}&price_max=${price_max}`,
    [price_min, price_max],
  );
  const reqParam = useMemo(() => {
    return category !== "all"
      ? `?categoryId=${category}${priceQuery}`
      : `?${priceQuery}`;
  }, [category, priceQuery]);

  const getProducts = async () => {
    try {
      const products: IProduct[] = await Api.products
        .search(reqParam)
        .then((data: any) => sortProductItems(data, sort))
        .catch((e) => {
          throw new Error(e.message);
        });
      return products;
    } catch (e: any) {
      console.error("=== getProducts: ", e.message);
      return null;
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", "productsList", paramsString],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {data == undefined || error ? (
        <Title size="md" text="Oops, something went wrong :(" />
      ) : data.length > 0 ? (
        <PaginatedProducts products={data} />
      ) : (
        <Title size="md" text="There are no products in this category :(" />
      )}
    </>
  );
});
