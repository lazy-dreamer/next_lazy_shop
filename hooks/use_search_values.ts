"use client";

import { useSearchParams } from "next/navigation";
import { SHOP_DEFAULTS } from "@/services/defaults/shop_defaults";
import { useMemo } from "react";

export const useSearchValues = () => {
  const searchParams = useSearchParams();
  const category: string | null = searchParams.get("category")
    ? searchParams.get("category")
    : SHOP_DEFAULTS.default_category;
  const sort: string | null = searchParams.get("sort")
    ? searchParams.get("sort")
    : SHOP_DEFAULTS.sort;
  const price_min: string | null = searchParams.get("price_min")
    ? searchParams.get("price_min")
    : String(SHOP_DEFAULTS.price_min);
  const price_max: string | null = searchParams.get("price_max")
    ? searchParams.get("price_max")
    : String(SHOP_DEFAULTS.price_max);
  const offset: string | null = searchParams.get("offset")
    ? searchParams.get("offset")
    : "0";
  const paramsString: string = searchParams.toString();

  return useMemo(
    () => ({
      category,
      sort,
      price_min,
      price_max,
      offset,
      paramsString,
    }),
    [category, sort, price_min, price_max, offset, paramsString],
  );
};
