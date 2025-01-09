import React from "react";
import { HeroSection } from "../hero_section/hero_section";
import { CategoriesSliderSection } from "../categories_slider_section/categories_slider_section";
import { QuoteSection } from "../quote_section/quote_section";
import { ContactsSection } from "../contacts_section/contacts_section";

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection className="no_paddings" />
      <CategoriesSliderSection />
      <QuoteSection />
      <ContactsSection />
    </>
  );
};
