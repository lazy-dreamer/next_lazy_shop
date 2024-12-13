import { ICategory } from "@/app/page";
import { Api } from "@/services/api/api-client";

export const getCategories = async () => {
  const cats: ICategory[] | null = await Api.categories.getAll();
  return cats;
};
