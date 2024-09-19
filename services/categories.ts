import {axiosInstance} from "./request-instance";
import {ICategory} from "../app/page";
import {ApiRoutes} from "./constants";

export const getAll = async () => {
  const {data} = await axiosInstance.get<ICategory[]>(ApiRoutes.CATEGORIES)
  return data
}