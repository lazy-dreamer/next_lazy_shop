import { StateCreator } from "zustand";
import { StoreState } from "@/store/user_store";

export interface ILogoutSlice {
  setLogout: () => void;
}

export const logoutSlice: StateCreator<StoreState, [], [], ILogoutSlice> = (
  set,
) => ({
  setLogout: () =>
    set({
      user: null,
      favorites: [],
      isFavoritesLoaded: false,
      cart: [],
      localCart: [],
      orders: [],
      isCheckout: false,
      isOrdersLoaded: false,
    }),
});
