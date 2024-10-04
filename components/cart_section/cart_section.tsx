'use client'
import React from "react";
import {Title} from "../ui/title";
import {useUserStore} from "../../store/user_store";
import {Preloader} from "../preloader/Preloader";
import {CartItem} from "../cart_item/cart_item";
import s from './cart_section.module.scss'

interface Props {
  className?: string
}

export const CartSection:React.FC<Props> = ({className=''}) => {
  const {cart, isCartLoaded} = useUserStore()
  
  if (!isCartLoaded) return <Preloader />
  
  return <section className={`${className && className}`}>
    <div className="screen_content">
      <div className={s.sides}>
        <div className={s.blocks}>
          {
            cart.length > 0 ?
              cart.map(item => <CartItem key={item.id} item={item} />)
            : isCartLoaded && <Title text={'Your cart is empty :('} size={'md'} className={'text_center'} />
          }
        </div>
        <div className={s.aside}>
          <Title text={'Order info'} size={'xs'} />
        </div>
      </div>
    </div>
  </section>;
}