import React from "react";
import {Title} from "../ui/title";

interface Props {
  className?: string
}

export const CartSection:React.FC<Props> = ({className=''}) => {
  return <section className={` ${className ? className: ''} `}>
    <div className="screen_content">
      <Title text={'Your cart is empty :('} size={'md'} className={'text_center'} />
    </div>
  </section>;
}