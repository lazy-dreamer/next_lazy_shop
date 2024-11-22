"use client";
import React from "react";
import s from "./quantity_block.module.scss";
import { useUserStore } from "../../store/user_store";

interface Props {
  className?: string;
  productId: number;
  quantity: number;
}

export const QuantityBlock: React.FC<Props> = ({
  className = "",
  productId,
  quantity = 1,
}) => {
  const { user, cart, changeCart, localCart, changeLocalCart } = useUserStore();
  const quantityHandler = (action: string) => {
    let cartArr;
    if (user) {
      cartArr = cart;
    } else {
      cartArr = localCart;
    }

    if (action == "plus") {
      cartArr.map((el) => {
        if (el.product.id == productId) {
          el.quantity++;
        }
      });
    } else {
      cartArr.map((el) => {
        if (el.product.id == productId) {
          el.quantity--;
        }
      });
    }

    if (user) {
      changeCart(cartArr);
    } else {
      changeLocalCart(cartArr);
    }
  };

  return (
    <div className={`${className && className} ${s.block}`}>
      <button
        type="button"
        className={`${s.btn} ${s.minus} ${quantity == 1 && "disabled"}`}
        onClick={() => quantityHandler("minus")}
      />
      <input
        type="text"
        value={quantity}
        onChange={() => console.log("quantity changed")}
      />
      <button
        type="button"
        className={`${s.btn} ${s.plus}`}
        onClick={() => quantityHandler("plus")}
      />
    </div>
  );
};
