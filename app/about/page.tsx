import React from "react";
import {AboutSection} from "../../components/about_section";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - About`
};

export default function AboutPage() {
  return <>
    <AboutSection/>
  </>;
}