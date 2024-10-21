"use client";
import React from "react";
import s from "./products_slider.module.scss";
import { Title } from "../ui/title";
import { IProduct } from "../../app/page";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductBlock } from "../product_block/product_block";

interface Props {
  className?: string;
  title: string;
  blocks: IProduct[];
}

export const ProductsSlider: React.FC<Props> = ({
  className = "",
  title,
  blocks,
}) => {
  let settings = {
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className={` ${className ? className : ""} `}>
      <Title size={"md"} text={title} />
      <div className={s.slider}>
        <Slider {...settings}>
          {blocks?.map((slide, index) => (
            <div key={index}>
              <ProductBlock productItem={slide} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
