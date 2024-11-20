"use client";
import React from "react";
import { Title } from "../ui/title";
import { useUserStore } from "../../store/user_store";
import { Preloader } from "../preloader/Preloader";
import { CartItem } from "../cart_item/cart_item";
import s from "./cart_section.module.scss";
import { ICartItem } from "../add_to_cart/add_to_cart";
import { CartInfo } from "../cart_info/cart_info";
import Link from "next/link";

interface Props {
  className?: string;
}

export const CartSection: React.FC<Props> = ({ className = "" }) => {
  const { cart, isCartLoaded, user, isAuthCheck } = useUserStore();
  console.log(isAuthCheck, isCartLoaded, cart, user);

  if (!isAuthCheck) return <Preloader />;

  return (
    <section className={`${className && className}`}>
      <div className="screen_content">
        <div className={s.sides}>
          <div className={s.blocks}>
            <Title text={"Cart items:"} size={"xs"} />
            {isCartLoaded &&
              (cart.length > 0 ? (
                cart.map((item: ICartItem) => (
                  <CartItem key={item.product.id} item={item} />
                ))
              ) : (
                <Title
                  text={"Your cart is empty :("}
                  size={"md"}
                  className={"text_center"}
                />
              ))}
          </div>
          <div className={s.aside}>
            <Title
              text={cart.length > 0 ? "Order info" : "No order info"}
              size={"xs"}
            />
            {cart.length > 0 && (
              <>
                <CartInfo />
                <Link href={"/checkout"} className={"main_btn min_wide"}>
                  Go to checkout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
