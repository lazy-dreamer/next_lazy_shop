import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
  isAuth: false,
  favorites: [],
  favLength: () => {
    const favorites = get().favorites;
    return favorites.length;
  },
  isFavoritesLoaded: false,
  cart: [],
  cartLength: () => {
    const cart = get().cart;
    return cart.length;
  },
  orders: [],
  changeIsAuth: (boolean) => set(() => ({ isAuth: boolean })),
  changeFavorites: (arr) => set({ favorites: arr }),
  setFavoritesLoaded: () => set({ isFavoritesLoaded: true }),
  setOrders: (arr) => set({ orders: arr }),
  setLogout: () => set({ isAuth: false, isFavoritesLoaded: false, orders: [], favorites: [] }),
}))

//const { isAuth, setLogout } = useUserStore()