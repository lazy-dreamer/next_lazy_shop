import React from "react";
import s from './category_block.module.scss'
import {ICategory} from "../../app/page";
import {Title} from "../ui/title";
import Link from "next/link";

interface Props {
  item: ICategory,
  className?: string
}

export const CategoryBlock:React.FC<Props> = ({className='', item}) => {
  let {id, name, image} = item;
  if (!image.includes('imgur')) {
    image = `https://picsum.photos/${400 + id}`
  }
  return <Link 
    href={`/shop/${String(id)}`} 
    className={`${className && className} ${s.cat_block} bg_img`}
    style={{backgroundImage: `url(${image})`}}
  >
    <Title size='xs' text={name} />
  </Link>;
}