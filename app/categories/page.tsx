import { CategoriesSection } from "../../components/categories_section/categories_section";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Categories`,
};

export const revalidate = 60;

export default function Categories() {
  return (
    <>
      <CategoriesSection />
    </>
  );
}
