import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { ICartItem } from "../../components/add_to_cart/add_to_cart";

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

export async function saveUserCart(
  userId: string | undefined,
  cart: ICartItem[],
) {
  if (userId === undefined) {
    userId = "";
  }
  const docRef = doc(db, "cart", userId);
  await setDoc(docRef, { cart }, { merge: true });
}
