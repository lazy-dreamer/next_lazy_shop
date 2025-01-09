import React from "react";
import s from "./category_block.module.scss";
import { ICategory } from "@/app/page";
import { Title } from "../ui/title";
import Link from "next/link";
import { SHOP_DEFAULTS } from "@/services/defaults/shop_defaults";

interface Props {
  item: ICategory;
  className?: string;
}

export const CategoryBlock: React.FC<Props> = ({ className = "", item }) => {
  let { id, name, image } = item;
  if (!image.includes("imgur")) {
    image = `https://picsum.photos/${400 + Number(id)}`;
  }
  return (
    <Link
      href={`/shop?category=${String(id)}&price_min=${SHOP_DEFAULTS.price_min}&price_max=${SHOP_DEFAULTS.price_max}&offset=0`}
      className={`${className} ${s.cat_block} bg_img`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Title size="xs" text={name} />
    </Link>
  );
};
