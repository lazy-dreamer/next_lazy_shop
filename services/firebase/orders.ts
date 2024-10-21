import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { IFullUserInfo } from "./user_info";
import { ICartItem } from "../../components/add_to_cart/add_to_cart";

export interface ICheckoutForm extends IFullUserInfo {
  comment?: string;
}

export interface IOrder {
  orderDate: string;
  orderTime: string;
  cartItems: ICartItem[];
  orderInfo: ICheckoutForm;
}

export async function getUserOrders(userId: string) {
  const docRef = doc(db, "orders", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().orders;
  } else {
    await setDoc(docRef, { orders: [] });
    return [];
  }
}

export async function saveUserOrders(
  userId: string | undefined,
  orders: IOrder[],
) {
  if (userId === undefined) {
    userId = "";
  }
  const docRef = doc(db, "orders", userId);
  await setDoc(docRef, { orders }, { merge: true });
}
