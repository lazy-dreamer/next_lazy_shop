import { IOrder } from "@/services/firebase/orders";
import { StateCreator } from "zustand";

export interface IOrdersSlice {
  orders: IOrder[];
  setOrders: (arr: IOrder[]) => void;
  isOrdersLoaded: boolean;
}

export const ordersSlice: StateCreator<IOrdersSlice> = (set) => ({
  orders: [],
  isOrdersLoaded: false,
  setOrders: (arr) => set({ orders: arr, isOrdersLoaded: true }),
});
