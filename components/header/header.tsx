import React from "react";
import s from './header.module.scss'
import {HeaderNav} from "../header_nav/header_nav";
import {MainLogo} from "../main_logo/main_logo";
import {HeaderAuthBlock} from "../header_auth_block/header_auth_block";

interface Props {
  className?: string
}

export const Header:React.FC<Props> = ({className}) => {
  return <header className={` ${className ? className: ''} ${s.header}`}>
    <div className={`screen_content ${s.header_container}`}>
      <MainLogo/>
      <div className={s.header_right}>
        <HeaderNav className='header_nav' />
        <HeaderAuthBlock />
      </div>
    </div>
  </header>;
}