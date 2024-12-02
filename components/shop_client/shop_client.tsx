"use client";
import React, { useState } from "react";
import { ShopFilters } from "../shop_filters/shop_filters";
import { ShopProducts } from "../shop_products/shop_products";
import { SHOP_DEFAULTS } from "@/services/constants";

interface Props {
  className?: string;
}

export const ShopClient: React.FC<Props> = ({ className = "" }) => {
  const [sorting, setSorting] = useState(SHOP_DEFAULTS.sort);
  const [priceQuery, setPriceQuery] = useState(
    `&price_min=${SHOP_DEFAULTS.price_min}&price_max=${SHOP_DEFAULTS.price_max}`,
  );

  return (
    <>
      <ShopFilters setSort={setSorting} setPrice={setPriceQuery} />
      <ShopProducts sort={sorting} priceQuery={priceQuery} />
    </>
  );
};
