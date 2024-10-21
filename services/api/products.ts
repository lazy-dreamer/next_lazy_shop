import { axiosInstance } from "./request-instance";
import { ApiRoutes, ERROR_PRODUCT } from "./../constants";
import { IProduct } from "../../app/page";

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
  } catch (e) {
    console.error("=== Product search Error: ", e.message);
    return null;
  }
};

export const product = async (id: string) => {
  try {
    const { data } = await axiosInstance
      .get<IProduct[]>(`${ApiRoutes.PRODUCTS + id}`, {
        params: { id },
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return data;
  } catch (e) {
    console.error("=== Product id Error: ", e.message);
    return ERROR_PRODUCT;
  }
};
