"use client";
import React, {useEffect, useState} from "react";
import {auth} from "../../services/firebase/firebase-config";
import {HeaderUser} from "../header_user/header_user";
import s from "./header_auth_block.module.scss";
import {ModalOverlay} from "../modal_overlay/modal_overlay";
import {RegistrationModal} from "../registration_modal/registration_modal";
import {onAuthStateChanged} from "@firebase/auth";
import {useUserStore} from "../../store/user_store";
import {
  getUserFavorites,
  saveUserFavorites,
} from "../../services/firebase/favorites";
import {getUserOrders} from "../../services/firebase/orders";
import {getUserCart, saveUserCart} from "../../services/firebase/cart";
import {getUserInfo} from "../../services/firebase/user_info";
import {mergeArrays} from "../../services/mergeArr";

interface Props {
  className?: string;
}

export const HeaderAuthBlock: React.FC<Props> = ({className = ""}) => {
  const [showUserBlock, setShowUserBlock] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  
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
    localCart,
    changeLocalCart,
    setAuthCheckDone
  } = useUserStore();
  const cartString = JSON.stringify(cart);
  const localCartString = JSON.stringify(localCart);
  
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('localCartItems') || '[]');
    if (cartItems) {
      changeLocalCart(cartItems)
      setIsInitiallyFetched(true)
    }
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites(user.uid)
          .then((favorites) => {
            changeFavorites(favorites);
          })
          .catch((err) => console.log("Fetching favorites error: ", err));
        getUserCart(user.uid)
          .then((cart) => {
            const local = JSON.parse(localStorage.getItem('localCartItems') || '[]');
            const newArr = mergeArrays(cart, local)
            changeCart(newArr);
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
        setAuthCheckDone(true);
      } else {
        setUser(null);
        setShowUserBlock(true);
        setAuthCheckDone(true);
      }
    });
  }, []);
  useEffect(() => {
    if (isInitiallyFetched && !user) {
      localStorage.setItem('localCartItems', JSON.stringify(localCart));
    }
  }, [localCart, localCartString]);
  useEffect(() => {
    if (isAuth) {
      saveUserFavorites(user?.uid, favorites);
    }
  }, [favorites]);
  useEffect(() => {
    if (isAuth) {
      saveUserCart(user?.uid, cart).then(() => {
        localStorage.setItem('localCartItems', '[]');
      });
    }
  }, [cart, cartString]);
  
  
  return (
    <div className={`${className && className}`}>
      {showUserBlock ? (
        user != null ? (
          <HeaderUser userName={user.email} avatar={user.photoURL}/>
        ) : (
          <button
            type="button"
            className={s.reg_btn}
            onClick={() => setShowRegModal(true)}
          >
            <span>Log in</span>
            <img src="/login.svg" alt="ico"/>
          </button>
        )
      ) : (
        <div className={"header_user_paceholder"}/>
      )}
      {showRegModal && (
        <ModalOverlay>
          <RegistrationModal modalClose={setShowRegModal}/>
        </ModalOverlay>
      )}
    </div>
  );
};
