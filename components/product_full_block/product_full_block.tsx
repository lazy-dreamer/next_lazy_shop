import React from "react";
import s from './product_full_block.module.scss'
import {Api} from "../../services/api-client";
import {IProduct} from "../../app/page";
import {Title} from "../ui/title";
import Image from "next/image";


interface Props {
  className?: string,
  product: IProduct
}

export function ProductFullBlock({className='', product}:Props) {
  return <div className={` ${className ? className: ''} ${s.block}`}>
    <div className="half_sides">
      <div className="side">
        <p>slider</p>
        <p>{product.category.id}</p>
      </div>
      <div className={`side ${s.content_side}`}>
        <Title size={'md'} text={product.title} />
        <p>{product.description}</p>
        <div className={s.body_bottom}>
          <strong className='green'>{product.price}$</strong>
          <button className={`green ${s.cart}`}>
            <span>Add to cart</span>
            <Image src='/add_to_cart.svg' alt='add to cart' width={10} height={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
}