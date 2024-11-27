"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  images: string[];
}

export const ProductImagesSlider: React.FC<Props> = ({ images }) => {
  let settings = {
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
  };
  if (images.length == 1) {
    images = [
      `https://picsum.photos/401`,
      `https://picsum.photos/402`,
      `https://picsum.photos/403`,
    ];
  }

  return (
    <Slider {...settings} className={"product_image_slider"}>
      {images.map((image, index) => (
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
