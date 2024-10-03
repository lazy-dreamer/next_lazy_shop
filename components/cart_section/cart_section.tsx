'use client'
import React from "react";
import {Title} from "../ui/title";
import {useUserStore} from "../../store/user_store";
import {Preloader} from "../preloader/Preloader";
import {CartItem} from "../cart_item/cart_item";

interface Props {
  className?: string
}

export const CartSection:React.FC<Props> = ({className=''}) => {
  const {cart, isCartLoaded} = useUserStore()
  console.log(cart, isCartLoaded)
  
  if (!isCartLoaded) return <Preloader />
  
  return <section className={`${className && className}`}>
    <div className="screen_content">
      {
        cart.length > 0 ?
          <div className="cart_blocks">
            {
              cart.map(item => <CartItem key={item.id} item={item} />)
            }
          </div>
          : isCartLoaded && <Title text={'Your cart is empty :('} size={'md'} className={'text_center'} />
      }
    </div>
  </section>;
}