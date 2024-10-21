import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export interface IUserInfo {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface IDeliveryInfo {
  city: string;
  street: string;
  building: string;
  apartment: string;
}
export interface IFullUserInfo extends IUserInfo, IDeliveryInfo {}

export const defaultUserInfo: IFullUserInfo = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  city: "",
  street: "",
  building: "",
  apartment: "",
};

export async function getUserInfo(userId: string) {
  const docRef = doc(db, "user_info", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().user_info;
  } else {
    await setDoc(docRef, { user_info: defaultUserInfo });
    return [];
  }
}

export async function saveUserInfo(
  userId: string | undefined,
  user_info: IFullUserInfo,
) {
  if (userId === undefined) {
    userId = "";
  }
  const docRef = doc(db, "user_info", userId);
  await setDoc(docRef, { user_info }, { merge: true });
}
