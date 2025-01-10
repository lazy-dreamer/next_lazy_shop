import { axiosInstance } from "./request-instance";
import { ApiRoutes } from "./../constants";
import { IProduct } from "@/app/page";
import { ERROR_PRODUCT } from "@/services/mock/error_product";

export const search = async (query: string) => {
  try {
    const { data } = await axiosInstance
      .get<IProduct[]>(ApiRoutes.PRODUCTS_SEARCH, {
        params: { query },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return data;
  } catch (e: any) {
    console.error("=== Product search Error: ", e.message);
    return ERROR_PRODUCT;
  }
};
