import {create} from "zustand";
import {User} from "@firebase/auth";
import {IProduct} from "../app/page";
import {IOrder} from "../services/firebase/orders";
import {ICartItem} from "../components/add_to_cart/add_to_cart";
import {defaultUserInfo, IFullUserInfo} from "../services/firebase/user_info";

interface IUserStore {
  isAuthCheckDone: boolean;
  isAuth: boolean;
  user: null | User;
  userInfo: null | IFullUserInfo;
  favorites: IProduct[];
  favLength: () => number;
  isFavoritesLoaded: boolean;
  cart: ICartItem[];
  changeCart: (arr: ICartItem[]) => void;
  cartLength: () => number;
  isCartLoaded: boolean;
  localCart: ICartItem[];
  changeLocalCart: (arr: ICartItem[]) => void;
  localCartLength: () => number;
  orders: IOrder[];
  isCheckout: boolean;
  isOrdersLoaded: boolean;
  setIsCheckout: (bool: boolean) => void;
  setAuthCheckDone: (bool: boolean) => void;
  setUser: (person: User | null) => void;
  setUserInfo: (info: IFullUserInfo) => void;
  changeFavorites: (arr: IProduct[]) => void;
  setOrders: ([]) => void;
  setLogout: () => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  isAuthCheckDone: false,
  setAuthCheckDone: (bool) => set({isAuthCheckDone: bool}),
  
  isAuth: false,
  user: null,
  setUser: (person) => set(() => ({user: person, isAuth: true})),
  userInfo: defaultUserInfo,
  setUserInfo: (info) => set(() => ({userInfo: info})),
  
  favorites: [],
  changeFavorites: (arr) => set({favorites: arr, isFavoritesLoaded: true}),
  favLength: () => {
    const favorites = get().favorites;
    return favorites.length;
  },
  isFavoritesLoaded: false,
  
  cart: [],
  changeCart: (arr) => set({cart: arr, isCartLoaded: true}),
  cartLength: () => {
    const cart = get().cart;
    return cart.length;
  },
  isCartLoaded: false,
  
  localCart: [],
  changeLocalCart: (arr) => set({localCart: arr}),
  localCartLength: () => {
    const cart = get().localCart;
    return cart.length;
  },
  
  orders: [],
  setOrders: (arr) => set({orders: arr, isOrdersLoaded: true}),
  isCheckout: false,
  isOrdersLoaded: false,
  setIsCheckout: (bool) => set({isCheckout: bool}),
  
  setLogout: () =>
    set({
      isAuth: false,
      user: null,
      favorites: [],
      isFavoritesLoaded: false,
      isCartLoaded: false,
      cart: [],
      orders: [],
      localCart: [],
      isCheckout: false,
      isOrdersLoaded: false,
    }),
}));

//const { isAuth, setLogout } = useUserStore()
