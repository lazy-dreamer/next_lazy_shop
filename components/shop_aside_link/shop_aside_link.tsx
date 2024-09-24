'use client';
import React, {useCallback} from "react";
import s from "./shop_aside_link.module.scss";
import {ICategory} from "../../app/page";
import {useRouter} from "next/navigation";
import { useParams } from 'next/navigation';

interface Props {
  category: ICategory
}

export const ShopAsideLink:React.FC<Props> = ({ category}) => {
  const router = useRouter();
  const { id } = useParams();
  
  const catChangeHandler = useCallback((cat: string) => {
    router.push(cat, {
      scroll: false
    });
  }, [router]);
  return <button
      className={`${id == String(category.id) ? 'active' : ''} ${s.cat_btn}`}
      onClick={() => catChangeHandler(String(category.id))}
    >
    {category.name}
  </button>;
}