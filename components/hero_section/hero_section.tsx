"use client";
import React from "react";
import s from "./hero_section.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { HeroSlide } from "../hero_slide/hero_slide";
import { HERO_SLIDES } from "@/services/mock/hero_slides";

interface Props {
  className?: string;
}

let settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 900,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const HeroSection: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={` ${className} `}>
      <Slider className={`${s.slider}`} {...settings}>
        {HERO_SLIDES.map((slide) => (
          <HeroSlide key={slide.title} slide={slide} />
        ))}
      </Slider>
    </section>
  );
};
