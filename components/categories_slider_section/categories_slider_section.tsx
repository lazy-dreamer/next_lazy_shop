"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import s from "./categories_slider_section.module.scss";
import { CategoryBlock } from "../category_block/category_block";
import { Preloader } from "../preloader/Preloader";
import { Title } from "../ui/title";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/request_functions";

interface Props {
  className?: string;
}

export const CategoriesSliderSection: React.FC<Props> = ({
  className = "",
}) => {
  const catDate = new Date().getDate();
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", "categoriesListSlider", catDate],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  let catSlides = data?.slice(0, 10);
  if (!catSlides) {
    catSlides = [];
  }

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <section className={`${className && className}`}>
      <div className="screen_content">
        <Title text="Popular Categories" size="lg" />
        {error ? (
          <div>
            <p>Oops, something went wrong... </p>
            <p>Can&apos;t load categories list :(</p>
          </div>
        ) : (
          catSlides && (
            <>
              <Slider
                className={`${s.slider} hidden_buttons_slider`}
                {...settings}
              >
                {catSlides.map((item) => (
                  <div key={item.id}>
                    <CategoryBlock item={item} />
                  </div>
                ))}
              </Slider>
              <div className="main_btn_wrapper centered">
                <Link href="/categories" className="main_btn">
                  <span>More categories</span>
                </Link>
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
};
