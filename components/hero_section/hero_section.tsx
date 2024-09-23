'use client';
import React from "react";
import s from './hero_section.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {HeroSlide} from "../hero_slide/hero_slide";

interface Props {
  className?: string
}
export interface ISlide {
  image: string,
  title: string,
  subtitle: string
}

const slides: ISlide[] = [
  {
    image: '/hero1.jpg',
    title: 'Lazy way to buy your favorite products',
    subtitle: 'Checkmate for all other shops'
  },
  {
    image: '/hero2.jpg',
    title: 'All products are targeted to success!',
    subtitle: 'Just add them to cart'
  },
  {
    image: '/hero3.jpg',
    title: 'Mobile friendly shop!',
    subtitle: 'For all mobile resolutions '
  },
  {
    image: '/hero4.jpg',
    title: 'Click "Add to cart" button!',
    subtitle: 'Shop everywhere!'
  },
]

export const HeroSection:React.FC<Props> = ({className=''}) => {
  let settings = {
    dots: true,
    arrows:false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return <section className={` ${className ? className: ''} `}>
    <Slider className={s.slider} {...settings}>
      {
        slides.map((slide, index) => <HeroSlide 
          key={slide.title} 
          slide={slide}
        />)
      }
    </Slider>
  </section>;
}