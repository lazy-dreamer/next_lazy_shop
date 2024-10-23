"use client";
import React, {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import s from "./categories_slider_section.module.scss";
import {ICategory} from "../../app/page";
import {Api} from "../../services/api/api-client";
import {CategoryBlock} from "../category_block/category_block";
import {Preloader} from "../preloader/Preloader";
import {Title} from "../ui/title";
import Link from "next/link";

interface Props {
  className?: string;
}

export const CategoriesSliderSection: React.FC<Props> = ({
                                                           className = "",
                                                         }) => {
  const [categoriesFailed, setCategoriesFailed] = useState(false);
  const [categories, setCategories] = useState<ICategory[] | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategories = async () => {
      const cats: ICategory[] = await Api.categories.getAll();
      if (cats) {
        setCategories(cats.slice(0, 10));
      } else {
        setCategoriesFailed(true);
      }
      setLoading(false);
    };
    getCategories();
  }, []);
  if (loading) {
    return <Preloader/>;
  }
  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 1
      }
    }]
  };
  
  return (
    <section className={`${className && className}`}>
      <div className="screen_content">
        <Title text="Popular Categories" size="lg"/>
        {categoriesFailed ? (
          <div>
            <p>Oops, something went wrong... </p>
            <p>Can't load categories list :(</p>
          </div>
        ) : (
          <>
            <Slider className={s.slider} {...settings}>
              {categories?.map((item) => (
                <div key={item.id}>
                  <CategoryBlock item={item}/>
                </div>
              ))}
            </Slider>
            <div className="main_btn_wrapper centered">
              <Link href="/categories" className="main_btn">
                <span>More categories</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
