"use client";
import React, { useState } from "react";
import { IProduct } from "@/app/page";
import s from "@/components/shop_products/shop_products.module.scss";
import { ProductBlock } from "@/components/product_block/product_block";
import { SHOP_DEFAULTS } from "@/services/constants";
import ReactPaginate from "react-paginate";

interface Props {
  products: IProduct[];
}
interface IPagiEvent {
  selected: number;
}

export const PaginatedProducts: React.FC<Props> = ({ products }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + SHOP_DEFAULTS.items_per_page;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / SHOP_DEFAULTS.items_per_page);

  const handlePageClick = (event: IPagiEvent) => {
    const newOffset =
      (event.selected * SHOP_DEFAULTS.items_per_page) % products.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={`${s.output_blocks} triple_blocks bottom_offset`}>
        {currentItems.map((prod) => (
          <ProductBlock key={prod.id} productItem={prod} />
        ))}
      </div>
      {products.length > SHOP_DEFAULTS.items_per_page && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          breakClassName={"disabled"}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className={"pagi_list"}
        />
      )}
    </>
  );
};
