import React from "react";
import { PersonalSection } from "../../components/personal_section/personal_section";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Personal information`,
};

export default function Page() {
  return <PersonalSection />;
}
