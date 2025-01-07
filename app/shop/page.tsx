import React from "react";
import { Shop } from "../../components/shop/shop";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Shop`,
};

export const revalidate = 60;

export default function ShopPage() {
  return <Shop />;
}
