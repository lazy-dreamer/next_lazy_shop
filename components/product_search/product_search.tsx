'use client';
import React, {useCallback, useRef, useState} from "react";
import s from './product_search.module.scss';
import {IProduct} from "../../app/page";
import {Preloader} from "../preloader/Preloader";
import {ApiRoutes} from "../../services/constants";

interface Props {
  className?: string
}

const fetchProducts = async (query: string): Promise<IProduct[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.PRODUCTS}?title=${query}`);
  return await response.json()
};

function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  return useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
}

export const ProductSearch:React.FC<Props> = ({className=''}) => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([]);
  
  const debouncedFetchProducts = useDebounce(async (searchQuery: string) => {
    if (searchQuery.length>1) {
      const fetchedProducts = await fetchProducts(searchQuery);
      setProducts(fetchedProducts);
      setLoading(false)
    } else {
      setProducts([]);
    }
  }, 1000);
  
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = (e.target as HTMLInputElement).value;
    setSearch(val);
    setLoading(true)
    debouncedFetchProducts(val);
  }
  
  return <div className={`${className && className} ${s.block} frame`}>
    <form className={s.search} autoComplete={'off'}>
      <input type="text" defaultValue={search} placeholder={'Search product...'} name={'search input'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e)} />
    </form>
    {
      search.length > 1 && (<div className={`${s.otput} frame`}>
        {loading ? <Preloader customClass={s.loader} /> : products.length > 0 ? (
          products.map((product) => (
            <p key={product.id}>{product.title}</p>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>)
    }
  </div>;
}