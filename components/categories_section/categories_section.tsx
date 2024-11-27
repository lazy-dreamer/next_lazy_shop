import React from "react";
import { Api } from "../../services/api/api-client";
import { Title } from "../ui/title";
import { CategoryBlock } from "../category_block/category_block";
import { ICategory } from "../../app/page";

export const CategoriesSection = async () => {
  let isCategoriesFailed = false;
  const categories: ICategory[] = await Api.categories.getAll();
  if (!categories) {
    isCategoriesFailed = true;
  }

  return (
    <section>
      <div className="screen_content">
        <Title text="Categories" size="lg" />
        <div className="triple_blocks">
          {isCategoriesFailed ? (
            <div>
              <p>Oops, something went wrong... </p>
              <p>Can't load categories list :(</p>
            </div>
          ) : (
            categories.map((item) => (
              <div key={item.id}>
                <CategoryBlock item={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
