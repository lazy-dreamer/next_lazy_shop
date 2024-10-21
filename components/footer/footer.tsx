import React from "react";
import s from "./footer.module.scss";
import { MainLogo } from "../main_logo/main_logo";
import { HeaderNav } from "../header_nav/header_nav";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`${className && className} ${s.footer}`}>
      <div className={`screen_content ${s.footer_container}`}>
        <div className={s.footer_sides}>
          <MainLogo />
          <HeaderNav className="footer_nav" />
        </div>
        <div className={s.footer_sides}>
          <p className={s.copyright}>All rights reserved.</p>
          <p className={s.copyright}>LazyShop {year} ©</p>
        </div>
      </div>
    </footer>
  );
};
