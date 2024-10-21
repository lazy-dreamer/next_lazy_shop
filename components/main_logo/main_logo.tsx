import React from "react";
import s from "./main_logo.module.scss";
import Link from "next/link";

interface Props {
  className?: string;
}

export const MainLogo: React.FC<Props> = ({ className = "" }) => {
  return (
    <Link href="/" className={` ${className ? className : ""} ${s.logo} `}>
      LazyShop
    </Link>
  );
};
