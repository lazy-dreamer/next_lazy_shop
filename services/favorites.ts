import { doc, setDoc, getDoc } from "firebase/firestore";
import {db} from "./firebase-config";
import {IProduct} from "../app/page";

export async function getUserFavorites(userId: string) {
  const docRef = doc(db, "favorites", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().favorites;
  } else {
    await setDoc(docRef, { favorites: [] });
    return [];
  }
}

export async function saveUserFavorites(userId: string | undefined, favorites: IProduct[]) {
  if (userId === undefined) {
    userId = ''
  }
  const docRef = doc(db, "favorites", userId);
  await setDoc(docRef, { favorites }, { merge: true });
}