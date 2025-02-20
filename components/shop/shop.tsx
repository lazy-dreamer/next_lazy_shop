import React from "react";
import s from "./shop.module.scss";
import { ShopAsideLinks } from "../shop_aside_links/shop_aside_links";
import { ShopClient } from "../shop_client/shop_client";
import { ProductSearch } from "@/components/search/product_search";

export const Shop: React.FC = () => {
  return (
    <section>
      <div className="screen_content">
        <div className={s.sides}>
          <div className={s.categories_side}>
            <div className={s.categories_side_in}>
              <ShopAsideLinks />
            </div>
          </div>
          <div className={s.content_side}>
            <ProductSearch />
            <ShopClient />
          </div>
        </div>
      </div>
    </section>
  );
};
