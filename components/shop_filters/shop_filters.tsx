'use client';
import React, {Dispatch, useEffect, useState} from "react";
import s from './shop_filters.module.scss'
import Select from "react-select";
import {SetStateAction} from "react/index";
import {getTrackBackground, Range} from "react-range";
import {debounce} from "../../services/debounce";

interface Props {
  className?: string,
  setSort: Dispatch<SetStateAction<string>>,
  setPrice: Dispatch<SetStateAction<string>>
}
export interface ISelectOption {
  value: string;
  label: string
}
const options = [
  {value: 'disabledOption', label: 'Sorting', isDisabled: true},
  {value: 'name_start', label: 'Name A - Z'},
  {value: 'name_end', label: 'Name Z - A'},
  {value: 'price_up', label: 'Price from low to high'},
  {value: 'price_down', label: 'Price from high to low'}
]
interface IRangeVal {
  initial: number[],
  min: number,
  max: number
}
const rangeVal:IRangeVal = {
  initial: [0, 1000],
  min: 0,
  max: 1000
}

export const ShopFilters:React.FC<Props> = ({setSort, setPrice}) => {
  const [range, setRange] = useState(rangeVal.initial);
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, []);
  useEffect(() => {
    const debouncedSetPrice = debounce((newPrice: string) => {
      setPrice(newPrice);
      console.log('22222')
    }, 1000);
    debouncedSetPrice(`&price_min=${range[0]}&price_max=${range[1]}`);
  
    return () => {
      debouncedSetPrice('');
    };
  }, [range]);
  
  return <div className={`${s.block}`}>
    {
      isMounted && (
        <div className="half_sides">
          <div className="side">
            <div className={s.range}>
              <p className={s.range_title}>{`Price from ${range[0]}$ to ${range[1]}$`}</p>
              <Range
                label="Select your value"
                step={1}
                min={0}
                max={1000}
                values={range}
                onChange={(values) => setRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "3px",
                      width: "100%",
                      background: getTrackBackground({
                        values:range,
                        colors: ["#ccc", "#15CEA1", "#ccc"],
                        min: rangeVal.min,
                        max: rangeVal.max,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    key={props.key}
                    style={{
                      ...props.style,
                      height: "15px",
                      width: "15px",
                      borderRadius: '50%',
                      backgroundColor: "#15CEA1",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="side">
            <Select
              id={id}
              defaultValue={options[0]}
              onChange={(opt) => {
                if (opt) {
                  setSort(opt.value) 
                }
              }}
              classNamePrefix="react-select"
              placeholder="Sorting"
              options={options}
            />
          </div>
        </div>
      )
    }
  </div>;
}