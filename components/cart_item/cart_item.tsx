import React from "react";
import s from "./cart_item.module.scss";
import { AddToCart, ICartItem } from "../add_to_cart/add_to_cart";
import { QuantityBlock } from "../quantity_block/quantity_block";
import Link from "next/link";
import { fixImageLinks } from "@/services/utils/fix_image_links";

interface Props {
  className?: string;
  item: ICartItem;
}

export const CartItem: React.FC<Props> = ({ className = "", item }) => {
  const { product, quantity } = item;

  return (
    <div className={`${className} ${s.block}`}>
      <div
        className={`${s.image} bg_img`}
        style={{ backgroundImage: `url(${fixImageLinks(product.images)[0]})` }}
      />
      <Link href={`/product/${product.id}`} className={s.title}>
        {product.title}
      </Link>
      <strong className={s.price}>{product.price}$</strong>
      <QuantityBlock
        quantity={quantity}
        productId={product.id}
        className={s.quant}
      />
      <strong className={s.price}>{product.price * quantity}$</strong>
      <AddToCart product={product} className={s.remove} />
    </div>
  );
};
