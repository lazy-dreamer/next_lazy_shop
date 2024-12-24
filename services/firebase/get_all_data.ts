import { getUserFavorites } from "@/services/firebase/favorites";
import { getUserCart } from "@/services/firebase/cart";
import { mergeArrays } from "@/services/utils/mergeArr";
import { getUserOrders, IOrder } from "@/services/firebase/orders";
import { getUserInfo, IFullUserInfo } from "@/services/firebase/user_info";
import { User } from "@firebase/auth";
import { ICartItem } from "@/components/add_to_cart/add_to_cart";
import { IProduct } from "@/app/page";

interface IGetAllDataProps {
  user: User;
  setUser: (person: User | null) => void;
  changeFavorites: (arr: IProduct[]) => void;
  setOrders: (arr: IOrder[]) => void;
  changeCart: (arr: ICartItem[]) => void;
  setUserInfo: (info: IFullUserInfo) => void;
}

export const getAllData = async ({
  user,
  setUser,
  changeFavorites,
  setOrders,
  changeCart,
  setUserInfo,
}: IGetAllDataProps): Promise<void> => {
  try {
    const [favorites, cart, orders, info] = await Promise.all([
      getUserFavorites(user.uid),
      getUserCart(user.uid),
      getUserOrders(user.uid),
      getUserInfo(user.uid),
    ]);

    const local = JSON.parse(localStorage.getItem("localCartItems") || "[]");
    const newCart = mergeArrays(cart, local);

    changeFavorites(favorites);
    changeCart(newCart);
    setOrders(orders);
    setUserInfo(info);
    setUser(user);
  } catch (err) {
    console.error("Error fetching user data: ", err);
  }
};
