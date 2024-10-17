import React from "react";
import {CartSection} from "../../components/cart_section/cart_section";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Cart`
};

export default function CartPage() {
  return <CartSection />;
}