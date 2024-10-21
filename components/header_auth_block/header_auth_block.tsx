"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase/firebase-config";
import { HeaderUser } from "../header_user/header_user";
import s from "./header_auth_block.module.scss";
import { ModalOverlay } from "../modal_overlay/modal_overlay";
import { RegistrationModal } from "../registration_modal/registration_modal";
import { onAuthStateChanged } from "@firebase/auth";
import { useUserStore } from "../../store/user_store";
import {
  getUserFavorites,
  saveUserFavorites,
} from "../../services/firebase/favorites";
import { getUserOrders } from "../../services/firebase/orders";
import { getUserCart, saveUserCart } from "../../services/firebase/cart";
import { getUserInfo } from "../../services/firebase/user_info";

interface Props {
  className?: string;
}

export const HeaderAuthBlock: React.FC<Props> = ({ className = "" }) => {
  const [showUserBlock, setShowUserBlock] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);

  const {
    isAuth,
    favorites,
    setUser,
    user,
    changeFavorites,
    setOrders,
    cart,
    changeCart,
    setUserInfo,
  } = useUserStore();
  const cartString = JSON.stringify(cart);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites(user.uid)
          .then((favorites) => {
            changeFavorites(favorites);
          })
          .catch((err) => console.log("Fetching favorites error: ", err));
        getUserCart(user.uid)
          .then((cart) => {
            changeCart(cart);
          })
          .catch((err) => console.log("Fetching favorites error: ", err));
        getUserOrders(user.uid)
          .then((orders) => {
            setOrders(orders);
          })
          .catch((err) => console.log("Fetching orders error: ", err));
        getUserInfo(user.uid)
          .then((info) => {
            setUserInfo(info);
          })
          .catch((err) => console.log("Fetching user info error: ", err));

        setUser(user);
        setShowUserBlock(true);
      } else {
        setUser(null);
        setShowUserBlock(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isAuth) {
      saveUserFavorites(user?.uid, favorites);
    }
  }, [favorites]);
  useEffect(() => {
    if (isAuth) {
      saveUserCart(user?.uid, cart);
    }
  }, [cartString]);

  return (
    <div className={`${className && className}`}>
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
