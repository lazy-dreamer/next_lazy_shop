import React from "react";
import s from './product_full_block.module.scss'
import {IProduct} from "../../app/page";
import {Title} from "../ui/title";
import {ProductImagesSlider} from "../product_images_slider";
import {FavBtn} from "../fav_btn/fav_btn";
import {AddToCart} from "../add_to_cart/add_to_cart";

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
        <div className={s.top}>
          <Title size={'md'} text={product.title} />
          <p>{product.description}</p>
        </div>
        <div className={s.bottom}>
          <strong className='green'>{product.price}$</strong>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  </div>
}