"use client";
import React from "react";
import { Title } from "../ui/title";
import { CategoryBlock } from "../category_block/category_block";
import { Preloader } from "@/components/preloader/Preloader";
import { useFetchCategories } from "@/hooks/use_fetch_categories";

export const CategoriesSection: React.FC = () => {
  const { data, error, isLoading } = useFetchCategories();

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
