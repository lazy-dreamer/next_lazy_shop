import React from "react";
import {IProduct} from "../../app/page";
import s from './cart_item.module.scss'

interface Props {
  className?: string,
  item: IProduct
}

export const CartItem:React.FC<Props> = ({className='', item}) => {
  return <div className={`${className && className} ${s.block}`}>
    {item.title}
  </div>;
}