import { create } from 'zustand'
import {User} from "@firebase/auth";
import {IProduct} from "../app/page";
import {IOrder} from "../services/firebase/orders";
import {ICartItem} from "../components/add_to_cart/add_to_cart";
import {defaultUserInfo, IFullUserInfo} from "../services/firebase/user_info";

interface IUserStore {
  isAuth: boolean,
  user: null | User,
  userInfo: null | IFullUserInfo,
  favorites: IProduct[],
  favLength: () => number,
  isFavoritesLoaded: false,
  cart: ICartItem[],
  cartLength: () => number,
  isCartLoaded: boolean,
  orders: IOrder[],
  setUser: (person:User | null) => void,
  setUserInfo: (info:IFullUserInfo) => void,
  changeFavorites: (arr) => void,
  changeCart: (arr) => void,
  setOrders: ([]) => void,
  setLogout: () => void
}

export const useUserStore = create<IUserStore>((set, get) => ({
  
  isAuth: false,
  user: null,
  setUser: (person) => set(() => ({ user: person, isAuth: true })),
  userInfo: defaultUserInfo,
  setUserInfo: (info) => set(() => ({ userInfo: info })),
  
  favorites: [],
  changeFavorites: (arr) => set({ favorites: arr, isFavoritesLoaded: true }),
  favLength: () => {
    const favorites = get().favorites;
    return favorites.length;
  },
  isFavoritesLoaded: false,
  
  cart: [],
  changeCart: (arr) => set({ cart: arr, isCartLoaded: true }),
  cartLength: () => {
    const cart = get().cart;
    return cart.length;
  },
  isCartLoaded: false,
  
  orders: [],
  setOrders: (arr) => set({ orders: arr }),
  
  setLogout: () => set({ 
    isAuth: false,
    user: null,
    favorites: [],
    isFavoritesLoaded: false,
    isCartLoaded: false,
    cart: [],
    orders: [],
  }),
}))

//const { isAuth, setLogout } = useUserStore()