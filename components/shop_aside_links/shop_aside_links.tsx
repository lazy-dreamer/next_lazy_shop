"use client";
import React from "react";
import s from "./shop_aside_links.module.scss";
import { ShopAsideLink } from "../shop_aside_link/shop_aside_link";
import { Preloader } from "@/components/preloader/Preloader";
import { ALL_CATEGORY } from "@/services/defaults/shop_defaults";
import { useFetchCategories } from "@/hooks/use_fetch_categories";

export const ShopAsideLinks = () => {
  const { data, error, isLoading } = useFetchCategories();

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
