import { StateCreator } from "zustand";

export interface ICheckoutSlice {
  isCheckout: boolean;
  setIsCheckout: (bool: boolean) => void;
}

export const checkoutSlice: StateCreator<ICheckoutSlice> = (set) => ({
  isCheckout: false,
  setIsCheckout: (bool) => set({ isCheckout: bool }),
});
