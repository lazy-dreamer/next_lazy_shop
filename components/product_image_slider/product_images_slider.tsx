"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fixImageLinks } from "@/services/utils/fix_image_links";
import { DEFAULT_PRODUCT_IMAGES } from "@/services/defaults/default_product_images";

interface Props {
  images: string[];
}

export const ProductImagesSlider: React.FC<Props> = ({ images }) => {
  let settings = {
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    autoplay: true,
  };

  let fixedImages = fixImageLinks(images);

  if (fixedImages.length == 1) {
    fixedImages = DEFAULT_PRODUCT_IMAGES;
  }

  return (
    <Slider
      {...settings}
      className={`product_image_slider hidden_buttons_slider ${fixedImages.length == 0 && "no_images"}`}
    >
      {fixedImages.map((image, index) => (
        <div key={index}>
          <div
            className="img_slide bg_img"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
    </Slider>
  );
};
