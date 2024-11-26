import { IProduct } from "@/app/page";
import { StateCreator } from "zustand";

export interface IFavoritesSlice {
  favorites: IProduct[];
  favLength: () => number;
  changeFavorites: (arr: IProduct[]) => void;
  isFavoritesLoaded: boolean;
}

export const favouritesSlice: StateCreator<IFavoritesSlice> = (set, get) => ({
  favorites: [],
  isFavoritesLoaded: false,
  favLength: () => get().favorites.length,
  changeFavorites: (arr) => set({ favorites: arr, isFavoritesLoaded: true }),
});
