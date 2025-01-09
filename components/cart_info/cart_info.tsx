"use client";
import React from "react";
import s from "./cart_info.module.scss";
import { useUserStore } from "@/store/user_store";
import { Title } from "../ui/title";
import { CartSideItem } from "../cart_side_item/cart_side_item";

interface Props {
  className?: string;
}

export const CartInfo: React.FC<Props> = ({ className = "" }) => {
  const { user, cart, localCart } = useUserStore();
  let cartTotal, executiveCart;
  if (user) {
    cartTotal = cart.reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0,
    );
    executiveCart = cart;
  } else {
    cartTotal = localCart.reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0,
    );
    executiveCart = localCart;
  }

  return (
    <div className={`${className} ${s.block}`}>
      <Title text={"Your order:"} size={"xxs"} />
      <ul className={s.list}>
        {executiveCart.map((item) => (
          <li key={item.product.id}>
            <CartSideItem item={item} />
          </li>
        ))}
      </ul>
      <div className={s.total}>
        <b>Total:</b>
        <strong>{cartTotal}$</strong>
      </div>
    </div>
  );
};
