import React from "react";
import s from "./shop_aside_links.module.scss";
import {ICategory} from "../../app/page";
import {Api} from "../../services/api/api-client";
import {ShopAsideLink} from "../shop_aside_link/shop_aside_link";

export async function ShopAsideLinks() {
  let isCategoriesFailed = false;
  const categories:ICategory[] = await Api.categories.getAll();
  if (!categories) {
    isCategoriesFailed = true;
  }
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
      {
        isCategoriesFailed ? <div>
          <p>Oops, something went wrong... </p><p>Can't load categories list :(</p>
        </div> : categories.map((catItem) => (
          <ShopAsideLink key={catItem.id} category={catItem} />
        ))
      }
    </div>
  )
}