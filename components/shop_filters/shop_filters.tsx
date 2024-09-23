'use client';
import React, {useEffect, useRef, useState} from "react";
import s from './shop_filters.module.scss'
import Select, {SelectInstance} from "react-select";

interface Props {
  className?: string
}
export interface ISelectOption {
  value: string;
  label: string
}


const options = [
  {value: 'disabledOption', label: 'Сортировка', isDisabled: true},
  {value: 'name_start', label: 'Название А - Я'},
  {value: 'name_end', label: 'Название Я - А'},
  {value: 'price_up', label: 'Цена по возростанию'},
  {value: 'price_down', label: 'Цена по убыванию'},
  {value: 'weight_light', label: 'Вес - легче'},
  {value: 'weight_heavy', label: 'Вес - тяжелее'}
]

export const ShopFilters:React.FC<Props> = ({className=''}) => {
  const [filterLine, setFilterLine] = useState('');
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const sortSelect = useRef<SelectInstance<ISelectOption | null>>(null);
  return <div className={` ${className ? className: ''} ${s.block}`}>
    <p>Filter line is - {filterLine}</p>
    {
      isMounted && (
        <Select
          id={id}
          ref={sortSelect}
          defaultValue={options[0]}
          onChange={(opt) => {
            console.log(opt?.value)
            // if (opt) switchFilter(opt.value)
          }}
          classNamePrefix="react-select"
          placeholder="Сортировка"
          options={options}
        />
      )
    }
    
  </div>;
}