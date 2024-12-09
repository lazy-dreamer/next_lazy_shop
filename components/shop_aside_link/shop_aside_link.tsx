"use client";
import React from "react";
import s from "./shop_aside_link.module.scss";
import { ICategory } from "../../app/page";
import { useQueryParamsUpdater } from "@/hooks/use_query_params_updater";
import { useSearchValues } from "@/hooks/use_search_values";

interface Props {
  category: ICategory;
}

export const ShopAsideLink: React.FC<Props> = ({ category }) => {
  const { category: categoryId } = useSearchValues();
  const updateQueryParams = useQueryParamsUpdater();

  const changeCategory = () => {
    updateQueryParams({
      category: category.id,
      offset: "0",
    });
  };

  return (
    <button
      onClick={changeCategory}
      className={`${categoryId == String(category.id) ? "active" : ""} ${s.cat_btn}`}
    >
      {category.name}
    </button>
  );
};
