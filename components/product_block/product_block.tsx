import React from "react";
import { IProduct } from "../../app/page";
import s from "./product_block.module.scss";
import { FavBtn } from "../fav_btn/fav_btn";
import { AddToCart } from "../add_to_cart/add_to_cart";
import { ProductLink } from "@/components/product_link/product_link";
import { fixImageLinks } from "@/services/utils/fix_image_links";

interface Props {
  className?: string;
  productItem: IProduct;
}

export const ProductBlock: React.FC<Props> = ({
  className = "",
  productItem,
}) => {
  const { id, title, price, description, images } = productItem;
  let fixedImages = fixImageLinks(images);
  if (fixedImages[0] == "https://placeimg.com/640/480/any") {
    fixedImages[0] = `https://picsum.photos/${400 + id}`;
  }
  const descr =
    description.length > 35
      ? description.substr(0, 35) + "..."
      : description.length;

  return (
    <div className={` ${className ? className : ""} ${s.item}`}>
      <div
        className={`${s.image} bg_img`}
        style={{ backgroundImage: `url(${fixedImages[0]})` }}
      >
        <FavBtn product={productItem} />
      </div>
      <div className={s.body}>
        <div className={s.body_top}>
          <ProductLink className={s.title} id={id} title={title} />
          <p>{descr}</p>
        </div>
        <div className={s.body_bottom}>
          <strong className="green">{price}$</strong>
          <AddToCart product={productItem} />
        </div>
      </div>
    </div>
  );
};
