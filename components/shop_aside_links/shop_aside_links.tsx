import React from "react";
import s from "./shop_aside_links.module.scss";
import {ICategory} from "../../app/page";
import {Api} from "../../services/api-client";
import {ShopAsideLink} from "../shop_aside_link/shop_aside_link";

export async function ShopAsideLinks() {
  const categories:ICategory[] = await Api.categories.getAll()
  
  return (
    <div className={s.links}>
      {categories.map((catItem) => (
        <ShopAsideLink key={catItem.id} category={catItem} />
      ))}
    </div>
  )
}