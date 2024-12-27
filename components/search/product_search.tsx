"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./product_search.module.scss";
import { IProduct } from "../../app/page";
import { Preloader } from "../preloader/Preloader";
import { useDebounce } from "../../hooks/use_debounce";
import { SearchItem } from "../search_item/search_item";
import axios from "axios";
import { ERROR_PRODUCT } from "@/services/defaults/error_product";

interface Props {
  className?: string;
}

const fetchProducts = async (query: string): Promise<IProduct[]> => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}products/?title=${query}`,
    ).catch((e) => {
      throw new Error(e.message);
    });
    return await data;
  } catch (e: any) {
    const errorSearchProduct = {
      ...ERROR_PRODUCT,
      title: "Oops, something went wrong :(",
    };
    console.error("=== Product search Error: ", e.message);
    return [errorSearchProduct];
  }
};

export const ProductSearch: React.FC<Props> = ({ className = "" }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<Document, MouseEvent> | MouseEvent,
  ) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current?.contains(event.target as Node)
    ) {
      setSearch("");
    }
  };

  const debouncedFetchProducts = useDebounce(async (searchQuery: string) => {
    if (searchQuery.length > 1) {
      const fetchedProducts = await fetchProducts(searchQuery);
      setProducts(fetchedProducts);
      setLoading(false);
    } else {
      setProducts([]);
    }
  }, 1000);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let val = (e.target as HTMLInputElement).value;
    setSearch(val);
    setLoading(true);
    debouncedFetchProducts(val);
  };

  return (
    <div
      className={`${className && className} ${s.block} frame`}
      ref={wrapperRef}
    >
      <form className={s.search} autoComplete={"off"}>
        <input
          type="text"
          value={search}
          placeholder={"Search product..."}
          name={"search input"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e)
          }
        />
      </form>
      {search.length > 1 && (
        <div className={`${s.otput} frame`}>
          {loading ? (
            <Preloader customClass={s.loader} />
          ) : products.length > 0 ? (
            <div className={`${s.otput_blocks} custom_styled_scroll`}>
              {products.map((product) => (
                <SearchItem product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};
