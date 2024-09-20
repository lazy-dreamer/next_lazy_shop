import React from "react";
import {Api} from "../services/api-client";
import {Title} from "./ui/title";
import {CategoryBlock} from "./category_block/category_block";
import {ICategory} from "../app/page";

export const CategoriesSection = async () => {
  const categories:ICategory[] = await Api.categories.getAll()
  
  return (
    <section>
      <div className="screen_content">
        <Title text='Categories' size='lg'/>
        <div className="triple_blocks">
        {
          categories.map(item => <CategoryBlock key={item.id} item={item}/>)
        }
        </div>
      </div>
    </section>
  );
}