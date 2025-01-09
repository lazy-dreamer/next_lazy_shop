import React from "react";
import s from "./cart_side_item.module.scss";
import { ICartItem } from "../add_to_cart/add_to_cart";

interface Props {
  className?: string;
  item: ICartItem;
}

export const CartSideItem: React.FC<Props> = ({ className = "", item }) => {
  return (
    <div className={`${className} ${s.block}`}>
      <div
        className={`${s.image} bg_img`}
        style={{ backgroundImage: `url(${item.product.images[0]})` }}
      />
      <div className={s.body}>
        <p className={s.title}>{item.product.title}</p>
        <p className={s.li_info}>
          <b>{item.quantity}pc.</b>
          <b className={"green"}>{item.product.price * item.quantity}$</b>
        </p>
      </div>
    </div>
  );
};
