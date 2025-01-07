"use client";

import { useSearchParams, useRouter } from "next/navigation";

export const useQueryParamsUpdater = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (
    newParams: Record<string, string | number | undefined>,
  ) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || "");

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value.toString());
      }
    });

    router.push(`?${currentParams.toString()}`);
  };

  return updateQueryParams;
};
