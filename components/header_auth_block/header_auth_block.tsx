'use client'
import React, {useEffect, useState} from "react";
import {auth} from "../../services/firebase-config";
import {HeaderUser} from "../header_user/header_user";
import s from './header_auth_block.module.scss'
import {ModalOverlay} from "../modal_overlay/modal_overlay";
import {RegistrationModal} from "../registration_modal/registration_modal";
import {onAuthStateChanged, User} from "@firebase/auth";

interface Props {
  className?: string
}

export const HeaderAuthBlock:React.FC<Props> = ({className=''}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, []);
  if (user) {
    console.log(user.photoURL)
  }
  
  
  return <div className={` ${className ? className: ''} `}>
    {
      user != null ? <HeaderUser userName={user.email} avatar={user.photoURL} /> :
        <button type='button' className={s.reg_btn} onClick={() => setShowRegModal(true)}>
          <span>Log in</span>
          <img src="/login.svg" alt="ico"/>
        </button>
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