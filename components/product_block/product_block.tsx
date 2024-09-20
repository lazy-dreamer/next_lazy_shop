import React from "react";
import {IPoduct} from "../../app/page";
import s from './product_block.module.scss'
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string
  productItem: IPoduct
}

export const ProductBlock:React.FC<Props> = ({className='', productItem}) => {
  const {id, title, price, description, images} = productItem;
  if (images[0].charAt(0) !== 'h') {
    images[0] = `https://picsum.photos/${400 + id}`
  }
  const descr = description.length > 35 ? description.substr(0, 35) + '...' : description.length
  
  return <div className={` ${className ? className: ''} ${s.item}`}>
    <div className={`${s.image} bg_img`} style={
      {backgroundImage: `url(${images[0]})`}
    } />
    <div className={s.body}>
      <div className={s.body_top}>
        <div className={s.title}>{title}</div>
        <p>{descr}</p>
        <div className={s.price}>
          <span>Price</span>
          <strong className='green'>{price}$</strong>
        </div>
      </div>
      <div className={s.body_bottom}>
        <Link href={`/product/${id}`} className={`${s.more}`}>Read more</Link>
        <button className={`green ${s.cart}`}>
          <span>Add to cart</span>
          <Image src='/add_to_cart.svg' alt='add to cart' width={10} height={20} />
        </button>
      </div>
    </div>
    {/*<div className={s.modal}></div>*/}
  </div>;
}