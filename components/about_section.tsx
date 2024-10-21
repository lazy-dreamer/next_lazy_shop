import React from "react";
import { Title } from "./ui/title";

interface Props {
  className?: string;
}

export const AboutSection: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={` ${className ? className : ""} `}>
      <div className="screen_content">
        <Title text="About page" size="xl" className="text_center" />
        <div className="simple_text text_container">
          <h3>What is LazyShop?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem laudantium nobis sit. Accusamus accusantium maiores
            possimus quia. Alias, architecto, dolor. Animi autem dolore dolores
            eius esse ipsam ipsum magni praesentium quod recusandae? Eos ipsam
            iure iusto modi nemo neque nisi nobis praesentium, quas quod rem
            repudiandae suscipit tempore voluptatem voluptatibus.
          </p>

          <h3>Popularity</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem laudantium nobis sit. Accusamus accusantium maiores
            possimus quia. Alias, architecto, dolor. Animi autem dolore dolores
            eius esse ipsam ipsum magni praesentium quod recusandae? Eos ipsam
            iure iusto modi nemo neque nisi nobis praesentium, quas quod rem
            repudiandae suscipit tempore voluptatem voluptatibus.
          </p>
          <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            accusantium aliquam aperiam at autem blanditiis deserunt dolorem
            doloribus dolorum, enim est facilis fuga illo, iure iusto laborum
            libero magnam magni molestiae, nemo nihil non omnis praesentium
            quaerat quam quo recusandae reiciendis rem repellendus rerum unde
            vitae voluptate voluptates! Maiores, neque?
          </blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            earum, reiciendis? Accusamus, accusantium ad aliquid aspernatur
            dolore earum hic laboriosam molestiae necessitatibus quos
            repellendus reprehenderit suscipit totam voluptas voluptates
            voluptatum.
          </p>

          <h3>Trending</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem laudantium nobis sit. Accusamus accusantium maiores
            possimus quia. Alias, architecto, dolor. Animi autem dolore dolores
            eius esse ipsam ipsum magni praesentium quod recusandae? Eos ipsam
            iure iusto modi nemo neque nisi nobis praesentium, quas quod rem
            repudiandae suscipit tempore voluptatem voluptatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium eos illum, odio qui totam veniam.
          </p>
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Adipisci labore maiores minima quae.</li>
            <li>Assumenda hic non nostrum odit.</li>
            <li>Culpa dolorum nesciunt optio perferendis.</li>
            <li>Eius hic illo quo reiciendis?</li>
          </ul>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem laudantium nobis sit. Accusamus accusantium maiores
            possimus quia. Alias, architecto, dolor. Animi autem dolore dolores
            eius esse ipsam ipsum magni praesentium quod recusandae? Eos ipsam
            iure iusto modi nemo neque nisi nobis praesentium, quas quod rem
            repudiandae suscipit tempore voluptatem voluptatibus.
          </p>
        </div>
      </div>
    </section>
  );
};
