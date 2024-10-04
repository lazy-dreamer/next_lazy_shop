import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "./firebase-config";
import {IProduct} from "../../app/page";

export async function getUserCart(userId: string) {
  const docRef = doc(db, "cart", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().cart;
  } else {
    await setDoc(docRef, { cart: [] });
    return [];
  }
}

export async function saveUserCart(userId: string | undefined, cart: IProduct[]) {
  if (userId === undefined) {
    userId = ''
  }
  const docRef = doc(db, "cart", userId);
  await setDoc(docRef, { cart }, { merge: true });
}