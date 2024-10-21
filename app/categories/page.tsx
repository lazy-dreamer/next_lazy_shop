import { CategoriesSection } from "../../components/categories_section";
import { Metadata } from "next";
import { SITE_TITLE } from "../../services/constants";

export const metadata: Metadata = {
  title: `${SITE_TITLE} - Categories`,
};

export default function Categories() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CategoriesSection />
    </>
  );
}
