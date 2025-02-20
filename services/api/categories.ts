import { axiosInstance } from "./request-instance";
import { ICategory } from "../../app/page";
import { ApiRoutes } from "./../constants";

export const getAll = async () => {
  try {
    const { data } = await axiosInstance
      .get<ICategory[]>(ApiRoutes.CATEGORIES, {
        params: { query: new Date().getMinutes() },
        adapter: "fetch",
        fetchOptions: { cache: "no-store" },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return data;
  } catch (e) {
    console.log("Categories fetch error:  ", e);
    return null;
  }
};
