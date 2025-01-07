"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/request_functions";
import { useMemo } from "react";

export const useFetchCategories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", "categoriesList"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return useMemo(
    () => ({
      data,
      error,
      isLoading,
    }),
    [data, error, isLoading],
  );
};
