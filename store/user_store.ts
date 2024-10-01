import { create } from 'zustand'

export const useUserStore = create((set) => ({
  isAuth: false,
  favorites: [],
  orders: [],
  changeIsAuth: (boolean) => set(() => ({ isAuth: boolean })),
  changeFavorites: (arr) => set({ favorites: arr }),
  setOrders: (arr) => set({ orders: arr }),
  setLogout: () => set({ isAuth: false, orders: [], favorites: [] }),
}))

//const { isAuth, setLogout } = useUserStore()