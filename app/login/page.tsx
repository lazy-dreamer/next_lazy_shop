import React from "react";
import {Metadata} from "next";
import {SITE_TITLE} from "../../services/constants";
import {LoginSection} from "../../components/login_section/login_section";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Login`,
};

export default function Page() {
  return <LoginSection/>
}
