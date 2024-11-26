import { create } from "zustand";
import { cartSlice, ICartSlice } from "@/store/cart_slice";
import { favouritesSlice, IFavoritesSlice } from "@/store/favourites_slice";
import { ordersSlice, IOrdersSlice } from "@/store/orders_slice";
import { checkoutSlice, ICheckoutSlice } from "@/store/checkout_slice";
import { logoutSlice, ILogoutSlice } from "@/store/logout_slice";
import { userSlice, IUserSlice } from "@/store/user_slice";

export type StoreState = IUserSlice &
  IFavoritesSlice &
  ICartSlice &
  IOrdersSlice &
  ICheckoutSlice &
  ILogoutSlice;

export const useUserStore = create<StoreState>((set, get, store) => ({
  ...userSlice(set, get, store),
  ...favouritesSlice(set, get, store),
  ...cartSlice(set, get, store),
  ...ordersSlice(set, get, store),
  ...checkoutSlice(set, get, store),
  ...logoutSlice(set, get, store),
}));
