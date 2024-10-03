'use client'
import React from "react";
import s from './add_to_cart.module.scss';
import Image from "next/image";
import {IProduct} from "../../app/page";
import {useUserStore} from "../../store/user_store";
import toast from "react-hot-toast";

interface Props {
  className?: string,
  product: IProduct
}

export const AddToCart:React.FC<Props> = ({className='', product}) => {
  const {isAuth, cart, changeCart} = useUserStore();
  let isInCart = cart.find((el:IProduct) => el.id === product.id);
  
  const addToCart = () => {
    let cartArr = [...cart, product]
    changeCart(cartArr)
    toast.success('Added to cart!', {
      icon: '✅',
    })
  }
  const removeFromCart = () => {
    let cartArr = cart.filter((el:IProduct) => el.id != product.id);
    changeCart(cartArr)
    toast.success('Removed from cart!', {
      icon: '✅',
    })
  }
  const onCartClick = () => {
    if (isAuth) {
      isInCart ? removeFromCart() : addToCart();
    } else {
      toast.error('You should be logged in or registered!', {
        icon: '⛔️',
      });
    }
  }
  
  return <button className={`green ${s.cart} ${className && className}`} onClick={onCartClick}>
    {isInCart ? <>
      <span>Remove from cart</span>
      <Image src='/remove_from_cart.svg' alt='add to cart' width={10} height={20} />
    </> : <>
      <span>Add to cart</span>
      <Image src='/add_to_cart.svg' alt='add to cart' width={10} height={20} />
    </>}
  </button>;
}