import React from "react";
import s from './product_full_block.module.scss'

interface Props {
  className?: string,
  productId: string
}

export const ProductFullBlock:React.FC<Props> = ({className='', productId}) => {
  return <h1 className={` ${className ? className: ''} `}>ProductFullBlock {productId}</h1>;
}