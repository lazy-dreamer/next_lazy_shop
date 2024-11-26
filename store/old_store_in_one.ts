import { User } from "@firebase/auth";
import { defaultUserInfo, IFullUserInfo } from "@/services/firebase/user_info";
import { IProduct } from "@/app/page";
import { ICartItem } from "@/components/add_to_cart/add_to_cart";
import { IOrder } from "@/services/firebase/orders";
import { create } from "zustand/index";

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
  setIsCartLoaded: (bool: boolean) => void;
  changeCart: (arr: ICartItem[]) => void;
  localCart: ICartItem[];
  changeLocalCart: (arr: ICartItem[]) => void;
  localCartLength: () => number;

  orders: IOrder[];
  setOrders: ([]) => void;
  isOrdersLoaded: boolean;

  isCheckout: boolean;
  setIsCheckout: (bool: boolean) => void;

  setLogout: () => void;
}

const useUserStore = create<IUserStore>((set, get) => ({
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
  localCart: [],
  changeLocalCart: (arr) => set({ localCart: arr }),
  localCartLength: () => {
    const cart = get().localCart;
    return cart.length;
  },

  isCheckout: false,
  setIsCheckout: (bool) => set({ isCheckout: bool }),

  orders: [],
  isOrdersLoaded: false,
  setOrders: (arr) => set({ orders: arr, isOrdersLoaded: true }),

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
}));

//const { isAuthCheck, setLogout } = useUserStore()
