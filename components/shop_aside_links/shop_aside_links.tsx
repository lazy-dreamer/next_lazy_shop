"use client";
import React from "react";
import s from "./shop_aside_links.module.scss";
import { ShopAsideLink } from "../shop_aside_link/shop_aside_link";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/request_functions";
import { Preloader } from "@/components/preloader/Preloader";

export const ShopAsideLinks = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories, categoriesList"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const allCat = {
    id: "all",
    name: "All categories",
    image: "string placeholder",
    creationAt: "string placeholder",
    updatedAt: "string placeholder",
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={s.links}>
      <ShopAsideLink key={"all"} category={allCat} />
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
