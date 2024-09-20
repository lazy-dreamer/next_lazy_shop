import {CategoriesSection} from "../../components/categories_section";

export default function Categories() {
  return <>
    {/* @ts-expect-error Server Component */}
    <CategoriesSection />
  </>
}