import {axiosInstance} from "./request-instance";
import {ApiRoutes} from "./constants";
import {IPoduct} from "../app/page";

export const search = async (query: string) => {
  const {data} = await axiosInstance.get<IPoduct[]>(ApiRoutes.PRODUCTS_SEARCH, {
    params: {query}
  })
  return data
}
export const getAll = async () => {
  const {data} = await axiosInstance.get<IPoduct[]>(ApiRoutes.PRODUCTS)
  return data
}