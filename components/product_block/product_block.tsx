import React from "react";
import { IProduct } from "../../app/page";
import s from "./product_block.module.scss";
import Link from "next/link";
import { FavBtn } from "../fav_btn/fav_btn";
import { AddToCart } from "../add_to_cart/add_to_cart";

interface Props {
  className?: string;
  productItem: IProduct;
}

export const ProductBlock: React.FC<Props> = ({
  className = "",
  productItem,
}) => {
  const { id, title, price, description, images } = productItem;
  if (images[0].charAt(0) !== "h") {
    images[0] = `https://picsum.photos/${400 + id}`;
  }
  const descr =
    description.length > 35
      ? description.substr(0, 35) + "..."
      : description.length;

  return (
    <div className={` ${className ? className : ""} ${s.item}`}>
      <div
        className={`${s.image} bg_img`}
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <FavBtn product={productItem} />
      </div>
      <div className={s.body}>
        <div className={s.body_top}>
          <Link href={`/product/${id}`} className={s.title}>
            {title}
          </Link>
          <p>{descr}</p>
        </div>
        <div className={s.body_bottom}>
          <strong className="green">{price}$</strong>
          <AddToCart product={productItem} />
        </div>
      </div>
      {/*<div className={s.modal}></div>*/}
    </div>
  );
};
