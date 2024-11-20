"use client";
import React from "react";
import s from "./add_to_cart.module.scss";
import Image from "next/image";
import { IProduct } from "../../app/page";
import { useUserStore } from "../../store/user_store";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  product: IProduct;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export const AddToCart: React.FC<Props> = ({ className = "", product }) => {
  const { isAuthCheck, cart, changeCart } = useUserStore();
  const itemInCart: ICartItem | undefined = cart.find(
    (el: ICartItem) => el.product.id === product.id,
  );
  const isInCart: boolean = itemInCart !== undefined;

  const addToCart = () => {
    let cartArr = [
      ...cart,
      {
        product,
        quantity: 1,
      },
    ];
    changeCart(cartArr);
    toast.success("Added to cart!", {
      icon: "✅",
    });
  };
  const removeFromCart = () => {
    let cartArr: ICartItem[] = cart.filter(
      (el: ICartItem) => el.product.id != product.id,
    );
    changeCart(cartArr);
    toast.success("Removed from cart!", {
      icon: "✅",
    });
  };
  const onCartClick = () => {
    if (isAuthCheck) {
      isInCart ? removeFromCart() : addToCart();
    } else {
      toast.error("You should be logged in or registered!", {
        icon: "⛔️",
      });
    }
  };

  return (
    <button
      className={`green ${s.cart} ${className && className}`}
      onClick={onCartClick}
    >
      {isInCart ? (
        <>
          <span>Remove from cart</span>
          <Image
            src="/remove_from_cart.svg"
            alt="add to cart"
            width={10}
            height={20}
          />
        </>
      ) : (
        <>
          <span>Add to cart</span>
          <Image
            src="/add_to_cart.svg"
            alt="add to cart"
            width={10}
            height={20}
          />
        </>
      )}
    </button>
  );
};
