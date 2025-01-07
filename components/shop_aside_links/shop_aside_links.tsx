"use client";
import React from "react";
import s from "./shop_aside_links.module.scss";
import { ShopAsideLink } from "../shop_aside_link/shop_aside_link";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/request_functions";
import { Preloader } from "@/components/preloader/Preloader";
import { ALL_CATEGORY } from "@/services/defaults/shop_defaults";
import { useSearchValues } from "@/hooks/use_search_values";

export const ShopAsideLinks = () => {
  const catDate = new Date().getMinutes();
  const { paramsString } = useSearchValues();
  console.log(paramsString);
  const asideLinksLoader = async () => {
    const cats = await getCategories();
    return cats;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", "categoriesList", paramsString],
    queryFn: asideLinksLoader,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={s.links}>
      <ShopAsideLink key={"all"} category={ALL_CATEGORY} />
      {error ? (
        <div>
          <p>Oops, something went wrong... </p>
          <p>Can't load categories list :(</p>
        </div>
      ) : (
        data &&
        data.map((catItem) => (
          <ShopAsideLink key={catItem.id} category={catItem} />
        ))
      )}
    </div>
  );
};
