import React from "react";
import s from "./shop_aside_links.module.scss";
import {ICategory} from "../../app/page";
import {Api} from "../../services/api/api-client";
import {ShopAsideLink} from "../shop_aside_link/shop_aside_link";

export async function ShopAsideLinks() {
  const categories:ICategory[] = await Api.categories.getAll()
  const allCat = {
    id: 'all',
    name: "All categories",
    image: "string placeholder",
    creationAt: "string placeholder",
    updatedAt: "string placeholder"
  }
  
  return (
    <div className={s.links}>
      <ShopAsideLink key={'all'} category={allCat} />
      {categories.map((catItem) => (
        <ShopAsideLink key={catItem.id} category={catItem} />
      ))}
    </div>
  )
}