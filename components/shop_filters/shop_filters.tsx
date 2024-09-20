import React, {useState} from "react";
import s from './shop_filters.module.scss'

interface Props {
  className?: string
}

export const ShopFilters:React.FC<Props> = ({className=''}) => {
  const [filterLine, setFilterLine] = useState('');
  return <div className={` ${className ? className: ''} ${s.block}`}>
    <p>Filter line is - {filterLine}</p>
  </div>;
}