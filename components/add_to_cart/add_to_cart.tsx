"use client";
import React from "react";
import s from "./add_to_cart.module.scss";
import Image from "next/image";
import {IProduct} from "../../app/page";
import {useUserStore} from "../../store/user_store";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  product: IProduct;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export const AddToCart: React.FC<Props> = ({className = "", product}) => {
  const {user, cart, changeCart, localCart, changeLocalCart} = useUserStore();
  let itemInCart: ICartItem | undefined;
  
  if (user) {
    itemInCart = cart.find(
      (el: ICartItem) => el.product.id === product.id,
    );
  } else {
    itemInCart = localCart.find(
      (el: ICartItem) => el.product.id === product.id,
    );
  }
  
  const isInCart: boolean = itemInCart !== undefined;
  
  const addToCart = () => {
    if (user) {
      let cartArr = [
        ...cart,
        {
          product,
          quantity: 1,
        },
      ];
      changeCart(cartArr);
    } else {
      let cartArr = [
        ...localCart,
        {
          product,
          quantity: 1,
        },
      ];
      
      changeLocalCart(cartArr)
    }
    
    toast.success("Added to cart!", {
      icon: "✅",
    });
  };
  const removeFromCart = () => {
    if (user) {
      let cartArr: ICartItem[] = cart.filter(
        (el: ICartItem) => el.product.id != product.id,
      );
      changeCart(cartArr);
    } else {
      let cartArr: ICartItem[] = localCart.filter(
        (el: ICartItem) => el.product.id != product.id,
      );
      changeLocalCart(cartArr);
    }
    
    toast.success("Removed from cart!", {
      icon: "✅",
    });
  };
  const onCartClick = () => {
    isInCart ? removeFromCart() : addToCart();
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
