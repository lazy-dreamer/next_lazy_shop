import React from "react";
import s from './product_full_block.module.scss'
import {IProduct} from "../../app/page";
import {Title} from "../ui/title";
import Image from "next/image";
import {ProductImagesSlider} from "../product_images_slider";
import {FavBtn} from "../fav_btn/fav_btn";


interface Props {
  className?: string,
  product: IProduct
}

export function ProductFullBlock({className='', product}:Props) {
  return <div className={` ${className ? className: ''} ${s.block}`}>
    <div className="half_sides">
      <div className={`side ${s.sliders_side}`}>
        <ProductImagesSlider images={product.images} />
        <FavBtn product={product} className={s.fav} />
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