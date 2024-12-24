"use client";
import React from "react";
import { ICartItem } from "@/components/add_to_cart/add_to_cart";
import { useUserStore } from "@/store/user_store";
import { mergeArrays } from "@/services/utils/mergeArr";
import { useRouter } from "next/navigation";

interface Props {
  items: ICartItem[];
}

export const OrderAgain: React.FC<Props> = ({ items }) => {
  const { cart, changeCart } = useUserStore();
  const router = useRouter();
  const orderAgainHandler = () => {
    const newCart = mergeArrays(cart, items);
    changeCart(newCart);
    router.push("/cart");
  };
  return (
    <button className={"main_btn"} onClick={orderAgainHandler}>
      <span>Order again</span>
    </button>
  );
};
