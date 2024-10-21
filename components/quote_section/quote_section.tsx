import React from "react";
import s from "./quote_section.module.scss";

interface Props {
  className?: string;
}

export const QuoteSection: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={` ${className ? className : ""} top_bordered`}>
      <div className="screen_content">
        <div className={s.quote}>
          <div className="simple_text">
            <h3>What is LazyShop?</h3>
            <blockquote>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem laudantium nobis sit. Accusamus accusantium
                maiores possimus quia. Alias, architecto, dolor. Animi autem
                dolore dolores eius esse ipsam ipsum magni praesentium quod
                recusandae? Eos ipsam iure iusto modi nemo neque nisi nobis
                praesentium, quas quod rem repudiandae suscipit tempore
                voluptatem voluptatibus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                consectetur distinctio eligendi id nostrum, officiis saepe vero.
                Dicta enim, id!
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
