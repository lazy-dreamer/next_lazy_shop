"use client";
import React, { Dispatch, useEffect, useState, memo } from "react";
import s from "./shop_filters.module.scss";
import Select from "react-select";
import { DoubleRange } from "../ui/double_range";
import { SHOP_DEFAULTS } from "@/services/constants";
import { useQueryParamsUpdater } from "@/hooks/use_query_params_updater";
import { useSearchValues } from "@/hooks/use_search_values";

interface Props {
  className?: string;
}
export interface ISelectOption {
  value: string;
  label: string;
}

export const ShopFilters: React.FC<Props> = memo(() => {
  const { price_max, price_min, sort } = useSearchValues();

  const [range, setRange] = useState([Number(price_min), Number(price_max)]);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const updateQueryParams = useQueryParamsUpdater();

  const sortDefaultOption = SHOP_DEFAULTS.sortingOptions.find(
    (opt) => opt.value === sort,
  );

  useEffect(() => {
    setIsMounted(true);
    updateQueryParams({
      price_min: range[0],
      price_max: range[1],
    });
  }, [range]);

  const sortingHandler = (opt: ISelectOption | null) => {
    if (opt) {
      updateQueryParams({
        sort: opt.value,
      });
    }
  };
  const priceHandler = (values: number[]) => {
    setRange(values);
    updateQueryParams({
      price_min: values[0],
      price_max: values[1],
    });
  };

  return (
    <div className={`${s.block}`}>
      {isMounted && (
        <div className="half_sides">
          <div className="side">
            <div className={s.range}>
              <p
                className={s.range_title}
              >{`Price from ${range[0]}$ to ${range[1]}$`}</p>
              <DoubleRange vals={range} setVals={priceHandler} />
            </div>
          </div>
          <div className="side">
            <Select
              id={id}
              defaultValue={sortDefaultOption}
              onChange={(opt) => sortingHandler(opt)}
              classNamePrefix="react-select"
              placeholder="Sorting"
              options={SHOP_DEFAULTS.sortingOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
});
