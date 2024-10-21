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
  const { cart, changeCart } = useUserStore();

  const quantityHandler = (action: string) => {
    const cartArr = cart;
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

    changeCart(cartArr);
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
        onChange={() => console.log("changed")}
      />
      <button
        type="button"
        className={`${s.btn} ${s.plus}`}
        onClick={() => quantityHandler("plus")}
      />
    </div>
  );
};
