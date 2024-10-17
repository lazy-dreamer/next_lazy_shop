import React from "react";
import {OrdersSection} from "../../components/orders_section/orders_section";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Orders`
};

export default function Page() {
  return <OrdersSection />;
}