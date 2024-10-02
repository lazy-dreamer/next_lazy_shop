'use client'
import React, {useEffect, useState} from "react";
import {auth} from "../../services/firebase-config";
import {HeaderUser} from "../header_user/header_user";
import s from './header_auth_block.module.scss'
import {ModalOverlay} from "../modal_overlay/modal_overlay";
import {RegistrationModal} from "../registration_modal/registration_modal";
import {onAuthStateChanged, User} from "@firebase/auth";
import {useUserStore} from "../../store/user_store";
import {getUserFavorites, saveUserFavorites} from "../../services/favorites";
import {getUserOrders} from "../../services/orders";

interface Props {
  className?: string
}

export const HeaderAuthBlock:React.FC<Props> = ({className=''}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showUserBlock, setShowUserBlock] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  
  const { isAuth, favorites, changeIsAuth, changeFavorites, setFavoritesLoaded, setOrders } = useUserStore()
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserFavorites(user.uid).then(favorites => {
          changeFavorites(favorites)
          setFavoritesLoaded()
        }).catch(err => console.log('Fetching favorites error: ', err));
  
        getUserOrders(user.uid).then(orders => {
          setOrders(orders)
        }).catch(err => console.log('Fetching orders error: ', err));
        
        setUser(user)
        changeIsAuth(true)
        setShowUserBlock(true)
      } else {
        setUser(null)
        setShowUserBlock(true)
      }
    });
  }, []);
  
  useEffect(() => {
    if (isAuth) {
      saveUserFavorites(user?.uid, favorites)
    }
  }, [favorites]);
  
  
  return <div className={` ${className ? className: ''} `}>
    {
      showUserBlock ?  (user != null ? <HeaderUser userName={user.email} avatar={user.photoURL} /> :
        <button type='button' className={s.reg_btn} onClick={() => setShowRegModal(true)}>
          <span>Log in</span>
          <img src="/login.svg" alt="ico"/>
        </button>) : <div className={'header_user_paceholder'} />
    }
    {
      showRegModal && (
        <ModalOverlay>
          <RegistrationModal modalClose={setShowRegModal}/>
        </ModalOverlay>
      )
    }
  </div>;
}