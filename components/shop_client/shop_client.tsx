import React from "react";
import { ShopFilters } from "../shop_filters/shop_filters";
import { ShopProducts } from "../shop_products/shop_products";

export const ShopClient: React.FC = () => {
  return (
    <>
      <ShopFilters />
      <ShopProducts />
    </>
  );
};
