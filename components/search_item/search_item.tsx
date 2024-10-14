import React from "react";
import s from './search_item.module.scss'
import {IProduct} from "../../app/page";
import {Title} from "../ui/title";
import Link from "next/link";

interface Props {
  className?: string,
  product: IProduct
}

export const SearchItem:React.FC<Props> = ({className='', product}) => {
  const {images, id, title } = product;
  if (images[0].charAt(0) !== 'h') {
    images[0] = `https://picsum.photos/${400 + id}`
  }
  return <Link href={`/product/${id}`} className={`${className && className} ${s.block}`}>
    <div className={`${s.img} bg_img`} style={{backgroundImage: `url(${images[0]})`}} />
    <div className={s.body}>
      <Title text={title} size={'xxs'} className={s.title} />
    </div>
  </Link>;
}