import React from "react";
import Image from "next/image";
import s from "./not_found_section.module.scss";
import { Title } from "../ui/title";
import Link from "next/link";

export const NotFoundSection: React.FC = ({ className = "" }) => {
  return (
    <section>
      <div className="screen_content">
        <div className={s.table}>
          <div className={s.cell}>
            <div className={s.img}>
              <Image src="/sad.svg" width={500} height={500} alt="Sad" />
            </div>
            <div className={s.heading}>
              <Title text={"404"} size={"xl"} className={s.nf_title} />
              <Title text={"Page not found :("} size={"md"} />
            </div>
            <Link href={"/"} className={"main_btn"}>
              Go to main page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
