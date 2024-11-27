"use client";
import React from "react";
import Link from "next/link";
import s from "./header_nav.module.scss";
import { usePathname } from "next/navigation";
import { useUserStore } from "../../store/user_store";

interface Props {
  className?: string;
}

export const HeaderNav: React.FC<Props> = ({ className = "" }) => {
  const pathname = usePathname();
  const {
    user,
    favLength,
    isFavoritesLoaded,
    isCartLoaded,
    cartLength,
    localCartLength,
  } = useUserStore();
  const favLen = favLength();
  let cartLen;
  if (user) {
    cartLen = cartLength();
  } else {
    cartLen = localCartLength();
  }

  return (
    <nav className={` ${className ? className : ""} ${s.nav} `}>
      <Link href="/" className={`${s.link} ${pathname == "/" ? "active" : ""}`}>
        Home
      </Link>
      <Link
        href="/categories"
        className={`${s.link} ${pathname == "/categories" ? "active" : ""}`}
      >
        Categories
      </Link>
      <Link
        href="/about"
        className={`${s.link} ${pathname == "/about" ? "active" : ""}`}
      >
        About
      </Link>
      {user && (
        <Link
          href="/favorites"
          className={`${s.link} ${pathname == "/favorites" ? "active" : ""}`}
        >
          <span>Favorites</span>{" "}
          {isFavoritesLoaded && (
            <span className={s.count}>
              <span>{favLen}</span>
            </span>
          )}
        </Link>
      )}
      <Link
        href="/shop/all"
        className={`${s.link} ${pathname.includes("/shop") ? "active" : ""}`}
      >
        Shop
      </Link>
      <Link
        href="/cart"
        className={`${s.link} ${pathname == "/cart" ? "active" : ""}`}
      >
        <span>Cart</span>{" "}
        {isCartLoaded && (
          <span className={s.count}>
            <span>{cartLen}</span>
          </span>
        )}
      </Link>
    </nav>
  );
};
