import React from "react";
import {CheckoutSection} from "../../components/checkout_section/checkout_section";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Checkout`
};

export default function Page() {
  return <CheckoutSection />
}