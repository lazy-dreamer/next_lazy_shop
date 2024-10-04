'use client'
import React from "react";
import s from './quantity_block.module.scss';

interface Props {
  className?: string,
  productId: number,
  quantity: number
}

export const QuantityBlock:React.FC<Props> = ({className='', productId, quantity= 1}) => {
  
  return <div className={`${className && className} ${s.block}`}>
    <button type='button' className={`${s.btn} ${s.minus}`} onClick={() => console.log('minus')} />
    <input type="text" value={quantity} onChange={() => console.log(this.target.value)} />
    <button type='button' className={`${s.btn} ${s.plus}`} onClick={() => console.log('plus')} />
  </div>;
}