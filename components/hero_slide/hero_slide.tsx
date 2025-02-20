import React from "react";
import s from "./hero_slide.module.scss";
import { Title } from "../ui/title";
import { Container } from "../ui/container";
import { ISlide } from "@/services/mock/hero_slides";

interface Props {
  slide: ISlide;
}

export const HeroSlide: React.FC<Props> = ({ slide }) => {
  const { title, subtitle, image } = slide;
  return (
    <div
      className={`bg_img ${s.slide}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={s.table}>
        <div className={s.cell}>
          <Container>
            <Title size="xl" text={title} />
            <Title size="xs" text={subtitle} />
          </Container>
        </div>
      </div>
    </div>
  );
};
