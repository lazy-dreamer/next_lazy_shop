import React from "react";
import {NotFoundSection} from "../../components/not_found_section/not_found_section";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Page not found`
};

export default function Page() {
  return <NotFoundSection />
}