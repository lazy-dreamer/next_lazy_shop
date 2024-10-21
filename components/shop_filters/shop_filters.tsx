"use client";
import React, { Dispatch, useEffect, useState, memo } from "react";
import s from "./shop_filters.module.scss";
import Select from "react-select";
import { SetStateAction } from "react/index";
import { DoubleRange } from "../ui/double_range";

interface Props {
  className?: string;
  setSort: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
}
export interface ISelectOption {
  value: string;
  label: string;
}
const options = [
  { value: "disabledOption", label: "Sorting", isDisabled: true },
  { value: "name_start", label: "Name A - Z" },
  { value: "name_end", label: "Name Z - A" },
  { value: "price_up", label: "Price from low to high" },
  { value: "price_down", label: "Price from high to low" },
];
export interface IRangeState {
  initial: number[];
  step: number;
  min: number;
  max: number;
}
const rangeVal: IRangeState = {
  initial: [1, 10001],
  step: 1,
  min: 1,
  max: 10001,
};

export const ShopFilters: React.FC<Props> = memo(({ setSort, setPrice }) => {
  const [range, setRange] = useState(rangeVal.initial);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const throttleTimer = setTimeout(() => {
      setPrice(`&price_min=${range[0]}&price_max=${range[1]}`);
    }, 500);

    return () => {
      clearTimeout(throttleTimer);
    };
  }, [range]);

  return (
    <div className={`${s.block}`}>
      {isMounted && (
        <div className="half_sides">
          <div className="side">
            <div className={s.range}>
              <p
                className={s.range_title}
              >{`Price from ${range[0]}$ to ${range[1]}$`}</p>
              <DoubleRange
                rangeState={rangeVal}
                vals={range}
                setVals={setRange}
              />
            </div>
          </div>
          <div className="side">
            <Select
              id={id}
              defaultValue={options[0]}
              onChange={(opt) => {
                if (opt) {
                  setSort(opt.value);
                }
              }}
              classNamePrefix="react-select"
              placeholder="Sorting"
              options={options}
            />
          </div>
        </div>
      )}
    </div>
  );
});
