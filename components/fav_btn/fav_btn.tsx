'use client'
import React from "react";
import s from './fav_btn.module.scss'
import {useUserStore} from "../../store/user_store";
import {IProduct} from "../../app/page";
import toast from "react-hot-toast";

interface Props {
  className?: string,
  product: IProduct
}

export const FavBtn:React.FC<Props> = ({className='', product}) => {
  const {isAuth, favorites, changeFavorites} = useUserStore();
  let isInFavList = favorites.find((el:IProduct) => el.id === product.id);
  const isFav: boolean = isInFavList !== undefined;
  
  const favAdd = () => {
    let favArr = [...favorites, product]
    changeFavorites(favArr)
    toast.success('Added to favorites!', {
      icon: '✅',
    })
  }
  const favRemove = () => {
    let favArr = favorites.filter((el:IProduct) => el.id != product.id);
    changeFavorites(favArr)
    toast.success('Removed from favorites!', {
      icon: '✅',
    })
  }
  const onFavClick = () => {
    if (isAuth) {
      isFav ? favRemove() : favAdd();
    } else {
      toast.error('You should be logged in or registered!', {
        icon: '⛔️',
      });
    }
  }
  
  return <button className={`${s.fav} ${className && className} ${isAuth && (isFav ? 'filled_fav' : '')}  `} onClick={onFavClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24">
      <path fill="#fff"
            d="m12 21-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812 2.388 10.4 2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412-2.625 2.963T13.45 19.7z"/>
    </svg>
  </button>
}