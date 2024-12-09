"use client";
import React from "react";
import { IProduct } from "@/app/page";
import s from "@/components/shop_products/shop_products.module.scss";
import { ProductBlock } from "@/components/product_block/product_block";
import { SHOP_DEFAULTS } from "@/services/constants";
import ReactPaginate from "react-paginate";
import { useSearchValues } from "@/hooks/use_search_values";
import { useQueryParamsUpdater } from "@/hooks/use_query_params_updater";

interface Props {
  products: IProduct[];
}
interface IPagiEvent {
  selected: number;
}

export const PaginatedProducts: React.FC<Props> = ({ products }) => {
  const { offset } = useSearchValues();
  const endOffset = Number(offset) + SHOP_DEFAULTS.items_per_page;
  const currentItems = products.slice(Number(offset), endOffset);
  const pageCount = Math.ceil(products.length / SHOP_DEFAULTS.items_per_page);
  const updateQueryParams = useQueryParamsUpdater();

  const handlePageClick = (event: IPagiEvent) => {
    const newOffset =
      (event.selected * SHOP_DEFAULTS.items_per_page) % products.length;

    updateQueryParams({
      offset: newOffset,
    });
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
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          forcePage={Number(offset) / SHOP_DEFAULTS.items_per_page}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          breakClassName={"disabled"}
          className={"pagi_list"}
        />
      )}
    </>
  );
};
