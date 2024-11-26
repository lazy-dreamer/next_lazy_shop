import { StateCreator } from "zustand";
import { ICartItem } from "@/components/add_to_cart/add_to_cart";

export interface ICartSlice {
  cart: ICartItem[];
  cartLength: () => number;
  isCartLoaded: boolean;
  setIsCartLoaded: (bool: boolean) => void;
  changeCart: (arr: ICartItem[]) => void;
  localCart: ICartItem[];
  changeLocalCart: (arr: ICartItem[]) => void;
  localCartLength: () => number;
}

export const cartSlice: StateCreator<ICartSlice> = (set, get) => ({
  cart: [],
  localCart: [],
  isCartLoaded: false,
  changeCart: (arr) => set({ cart: arr, isCartLoaded: true }),
  changeLocalCart: (arr) => set({ localCart: arr }),
  cartLength: () => get().cart.length,
  localCartLength: () => get().localCart.length,
  setIsCartLoaded: (bool) => set({ isCartLoaded: bool }),
});
