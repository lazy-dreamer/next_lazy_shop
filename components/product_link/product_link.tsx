"use client";
import React from "react";
import Link from "next/link";
import { useSearchValues } from "@/hooks/use_search_values";

interface Props {
  className?: string;
  id: string | number;
  title: string;
}

export const ProductLink: React.FC<Props> = ({ className = "", id, title }) => {
  const { paramsString } = useSearchValues();

  return (
    <Link href={`/product/${id}?${paramsString}`} className={className}>
      {title}
    </Link>
  );
};
