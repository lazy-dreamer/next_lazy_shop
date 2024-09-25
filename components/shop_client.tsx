"use client"
import React, {useState} from "react";
import {ShopFilters} from "./shop_filters/shop_filters";
import {ShopProducts} from "./shop_products/shop_products";
import {useParams} from "next/navigation";

interface Props {
  className?: string
}

export const ShopClient:React.FC<Props> = ({className=''}) => {
  const [sorting, setSorting] = useState('name_start')
  const [priceQuery, setPriceQuery] = useState('&price_min=0&price_max=10001')
  const { id } = useParams();
  
  return <>
    <ShopFilters setSort={setSorting} setPrice={setPriceQuery} />
    <ShopProducts category={id} sort={sorting} priceQuery={priceQuery} />
  </>
}