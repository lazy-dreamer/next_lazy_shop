import { defaultUserInfo, IFullUserInfo } from "@/services/firebase/user_info";
import { User } from "@firebase/auth";
import { StateCreator } from "zustand";

export interface IUserSlice {
  isAuthCheck: boolean;
  user: null | User;
  setUser: (person: User | null) => void;
  userInfo: null | IFullUserInfo;
  setUserInfo: (info: IFullUserInfo) => void;
}

export const userSlice: StateCreator<IUserSlice> = (set) => ({
  isAuthCheck: false,
  user: null,
  userInfo: defaultUserInfo,
  setUser: (person) => set(() => ({ user: person, isAuthCheck: true })),
  setUserInfo: (info) => set(() => ({ userInfo: info })),
});
