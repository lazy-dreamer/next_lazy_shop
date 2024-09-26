import {axiosInstance} from "./request-instance";
import {ApiRoutes} from "./constants";
import {IProduct} from "../app/page";

export const search = async (query: string) => {
  // console.log(query)
  const {data} = await axiosInstance.get<IProduct[]>(ApiRoutes.PRODUCTS_SEARCH, {
    params: {query}
  })
  return data
}

export const product = async (id: string) => {
  // console.log(id)
  const {data} = await axiosInstance.get<IProduct[]>(`${ApiRoutes.PRODUCTS+ id}`,{
    params: {id}
  })
  return data
}

export const getAll = async () => {
  const {data} = await axiosInstance.get<IProduct[]>(ApiRoutes.PRODUCTS)
  return data
}