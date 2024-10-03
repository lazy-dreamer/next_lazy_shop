import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "./firebase-config";
import {IProduct} from "../app/page";

export interface IOrder {
  date: string,
  products: IProduct[]
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

export async function saveUserOrders(userId: string | undefined, orders: IOrder[]) {
  if (userId === undefined) {
    userId = ''
  }
  const docRef = doc(db, "orders", userId);
  await setDoc(docRef, { orders }, { merge: true });
}