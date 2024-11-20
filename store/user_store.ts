import { create } from "zustand";
import { User } from "@firebase/auth";
import { IProduct } from "../app/page";
import { IOrder } from "../services/firebase/orders";
import { ICartItem } from "../components/add_to_cart/add_to_cart";
import { defaultUserInfo, IFullUserInfo } from "../services/firebase/user_info";

interface IUserStore {
  isAuthCheck: boolean;
  user: null | User;
  setUser: (person: User | null) => void;
  userInfo: null | IFullUserInfo;
  setUserInfo: (info: IFullUserInfo) => void;

  favorites: IProduct[];
  favLength: () => number;
  changeFavorites: (arr: IProduct[]) => void;
  isFavoritesLoaded: boolean;

  cart: ICartItem[];
  cartLength: () => number;
  isCartLoaded: boolean;
  setIsCartLoaded: (bool) => void;
  changeCart: (arr: ICartItem[]) => void;

  orders: IOrder[];
  setOrders: ([]) => void;

  isCheckout: boolean;
  isOrdersLoaded: boolean;
  setIsCheckout: (bool: boolean) => void;

  setLogout: () => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  isAuthCheck: false,
  user: null,
  userInfo: defaultUserInfo,
  setUser: (person) => set(() => ({ user: person, isAuthCheck: true })),
  setUserInfo: (info) => set(() => ({ userInfo: info })),

  favorites: [],
  isFavoritesLoaded: false,
  changeFavorites: (arr) => set({ favorites: arr, isFavoritesLoaded: true }),
  favLength: () => {
    const favorites = get().favorites;
    return favorites.length;
  },

  cart: [],
  isCartLoaded: false,
  setIsCartLoaded: (bool) => set({ isCartLoaded: bool }),
  changeCart: (arr) => set({ cart: arr, isCartLoaded: true }),
  cartLength: () => {
    const cart = get().cart;
    return cart.length;
  },

  orders: [],
  isCheckout: false,
  isOrdersLoaded: false,
  setOrders: (arr) => set({ orders: arr, isOrdersLoaded: true }),
  setIsCheckout: (bool) => set({ isCheckout: bool }),

  setLogout: () =>
    set({
      isAuthCheck: false,
      user: null,
      favorites: [],
      isFavoritesLoaded: false,
      isCartLoaded: false,
      cart: [],
      orders: [],
      isCheckout: false,
      isOrdersLoaded: false,
    }),
}));

//const { isAuthCheck, setLogout } = useUserStore()
