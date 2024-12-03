"use client";

import { useSearchParams } from "next/navigation";

export const useSearchValues = () => {
  const searchParams = useSearchParams();
  const categoryId: string | null = searchParams.get("id");
  const sort: string | null = searchParams.get("sort");
  const price_min: string | null = searchParams.get("price_min");
  const price_max: string | null = searchParams.get("price_max");

  return {
    categoryId,
    sort,
    price_min,
    price_max,
  };
};
