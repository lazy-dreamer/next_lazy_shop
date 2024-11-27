import React from "react";
import { FavoritesSection } from "../../components/favorites_section/favorites_section";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Favorites`,
};

export default function Page() {
  return <FavoritesSection />;
}
