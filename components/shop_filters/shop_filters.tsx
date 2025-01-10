"use client";
import React, { useEffect, useState, memo } from "react";
import s from "./shop_filters.module.scss";
import Select from "react-select";
import { DoubleRange } from "../ui/double_range";
import { SHOP_DEFAULTS } from "@/services/mock/shop_defaults";
import { useQueryParamsUpdater } from "@/hooks/use_query_params_updater";
import { useSearchValues } from "@/hooks/use_search_values";
import { useDebounce } from "@/hooks/use_debounce";
import { usePathname } from "next/navigation";

export interface ISelectOption {
  value: string;
  label: string;
}

export const ShopFilters: React.FC = memo(() => {
  const { price_max, price_min, sort } = useSearchValues();
  const [range, setRange] = useState([Number(price_min), Number(price_max)]);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const updateQueryParams = useQueryParamsUpdater();

  const sortDefaultOption = SHOP_DEFAULTS.sortingOptions.find(
    (opt) => opt.value === sort,
  );

  const debouncedUpdateQueryParams = useDebounce(updateQueryParams, 500);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
    if (
      pathname.includes("/shop") &&
      (price_min !== String(range[0]) || price_max !== String(range[1]))
    ) {
      debouncedUpdateQueryParams({
        price_min: range[0],
        price_max: range[1],
      });
    }
  }, [range, debouncedUpdateQueryParams]);

  const sortingHandler = (opt: ISelectOption | null) => {
    if (opt) {
      updateQueryParams({
        sort: opt.value,
      });
    }
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
              <DoubleRange vals={range} setVals={setRange} />
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
