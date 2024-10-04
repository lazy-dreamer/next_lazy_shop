import React from "react";
import {IProduct} from "../../app/page";
import s from './cart_item.module.scss'
import {AddToCart} from "../add_to_cart/add_to_cart";
import {QuantityBlock} from "../quantity_block/quantity_block";

interface Props {
  className?: string,
  item: IProduct
}

export const CartItem:React.FC<Props> = ({className='', item}) => {
  return <div className={`${className && className} ${s.block}`}>
    <div className={`${s.image} bg_img`} style={{backgroundImage: `url(${item.images[0]})`}} />
    <div className={s.title}>{item.title}</div>
    <strong className={s.price}>{item.price}$</strong>
    <QuantityBlock quantity={1} productId={item.id} className={s.quant} />
    <strong className={s.price}>{item.price}$</strong>
    <AddToCart product={item} className={s.remove} />
  </div>;
}