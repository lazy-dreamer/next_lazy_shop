'use client'
import React, {useState} from "react";
import s from "./header.module.scss";
import {HeaderNav} from "../header_nav/header_nav";
import {MainLogo} from "../main_logo/main_logo";
import {HeaderAuthBlock} from "../header_auth_block/header_auth_block";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({className = ""}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <header className={`${className && className} ${s.header}`}>
      <div className={`screen_content ${s.header_container}`}>
        <MainLogo/>
        <div className={s.header_right}>
          <HeaderNav className={`${s.header_nav} ${showMobileMenu ? 'mobile_menu_open' : ''}`}/>
          <div className={s.right_controls}>
            <HeaderAuthBlock/>
            <button className={`${s.menu_btn} ${showMobileMenu ? 'opened' : ''}`}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}/>
          </div>
        </div>
      </div>
    </header>
  );
};
