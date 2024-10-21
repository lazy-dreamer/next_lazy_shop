import React from "react";
import { SuccessSection } from "../../components/success_section/success_section";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Success`,
};

export default function ShopPage() {
  return <SuccessSection />;
}
