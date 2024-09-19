'use client'
import React from "react";
import Link from "next/link";
import s from './header_nav.module.scss'
import { usePathname } from "next/navigation";

interface Props {
  className?: string
}

export const HeaderNav:React.FC<Props> = ({className=''}) => {
  const pathname = usePathname();
  
  return <nav className={` ${className ? className: ''} ${s.nav} `}>
    <Link href='/' className={`${s.link} ${pathname == "/" ? "active" : ""}`}>Home</Link>
    <Link href='/categories' className={`${s.link} ${pathname == "/categories" ? "active" : ""}`}>Categories</Link>
    <Link href='/about' className={`${s.link} ${pathname == "/about" ? "active" : ""}`}>About</Link>
    <Link href='/shop' className={`${s.link} ${pathname.includes("/shop") ? "active" : ""}`}>Shop</Link>
    <Link href='/cart' className={`${s.link} ${pathname == "/cart" ? "active" : ""}`}>Cart</Link>
  </nav>;
}