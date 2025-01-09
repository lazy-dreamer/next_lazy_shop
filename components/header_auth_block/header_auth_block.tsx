"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/services/firebase/firebase-config";
import { HeaderUser } from "../header_user/header_user";
import s from "./header_auth_block.module.scss";
import { ModalOverlay } from "../modal_overlay/modal_overlay";
import { RegistrationModal } from "../registration_modal/registration_modal";
import { onAuthStateChanged } from "@firebase/auth";
import { useUserStore } from "@/store/user_store";
import { saveUserFavorites } from "@/services/firebase/favorites";
import { saveUserCart } from "@/services/firebase/cart";
import { getAllData } from "@/services/firebase/get_all_data";

interface Props {
  className?: string;
}

export const HeaderAuthBlock: React.FC<Props> = ({ className = "" }) => {
  const [showUserBlock, setShowUserBlock] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

  const {
    isAuthCheck,
    favorites,
    setUser,
    user,
    changeFavorites,
    setOrders,
    cart,
    changeCart,
    setUserInfo,
    localCart,
    changeLocalCart,
    setIsCartLoaded,
  } = useUserStore();
  const cartString = JSON.stringify(cart);
  const localCartString = JSON.stringify(localCart);

  useEffect(() => {
    const cartItems = JSON.parse(
      localStorage.getItem("localCartItems") || "[]",
    );
    if (cartItems) {
      changeLocalCart(cartItems);
      setIsInitiallyFetched(true);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getAllData({
          user,
          setUser,
          changeFavorites,
          setOrders,
          changeCart,
          setUserInfo,
        }).then();
        setShowUserBlock(true);
      } else {
        setUser(null);
        setShowUserBlock(true);
        setIsCartLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isInitiallyFetched && !user) {
      localStorage.setItem("localCartItems", JSON.stringify(localCart));
    }
  }, [localCart, localCartString]);

  useEffect(() => {
    if (isAuthCheck && user) {
      saveUserFavorites(user?.uid, favorites).then();
    }
  }, [favorites]);

  useEffect(() => {
    if (isAuthCheck && user) {
      saveUserCart(user?.uid, cart).then(() => {
        localStorage.setItem("localCartItems", "[]");
      });
    }
  }, [cart, cartString]);

  return (
    <div className={`${className}`}>
      {showUserBlock ? (
        user != null ? (
          <HeaderUser userName={user.email} avatar={user.photoURL} />
        ) : (
          <button
            type="button"
            className={s.reg_btn}
            onClick={() => setShowRegModal(true)}
          >
            <span>Log in</span>
            <img src="/login.svg" alt="ico" />
          </button>
        )
      ) : (
        <div className={"header_user_paceholder"} />
      )}
      {showRegModal && (
        <ModalOverlay>
          <RegistrationModal modalClose={setShowRegModal} />
        </ModalOverlay>
      )}
    </div>
  );
};
