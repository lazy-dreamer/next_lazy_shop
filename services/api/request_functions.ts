import { ICategory } from "@/app/page";
import { Api } from "@/services/api/api-client";

export const getCategories = async () => {
  try {
    const cats: ICategory[] | null = await Api.categories
      .getAll()
      .catch((e) => {
        throw new Error(e.message);
      });
    return cats;
  } catch (e: any) {
    console.error("=== getCategories: ", e.message);
    return null;
  }
};
