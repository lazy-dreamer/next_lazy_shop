"use client";
import React from "react";
import { Title } from "../ui/title";
import { CategoryBlock } from "../category_block/category_block";
import { useQuery } from "@tanstack/react-query";
import { Preloader } from "@/components/preloader/Preloader";
import { getCategories } from "@/services/api/request_functions";

export const CategoriesSection: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", "categoriesList"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section>
      <div className="screen_content">
        <Title text="Categories" size="lg" />
        <div className="triple_blocks">
          {data == undefined || error ? (
            <div>
              <p>Oops, something went wrong... </p>
              <p>Can&apos;t load categories list :(</p>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <div key={item.id}>
                <CategoryBlock item={item} />
              </div>
            ))
          ) : (
            <Title size="md" text="There are no categories :(" />
          )}
        </div>
      </div>
    </section>
  );
};
