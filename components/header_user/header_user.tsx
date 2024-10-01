'use client'
import React, {useEffect, useRef, useState} from "react";
import s from './header_user.module.scss'
import { signOut } from "firebase/auth";
import {auth} from "../../services/firebase-config";
import toast from 'react-hot-toast';
import Link from "next/link";
import {useUserStore} from "../../store/user_store";

interface Props {
  className?: string,
  userName: string | null,
  avatar: string | null
}

export const HeaderUser = ({className='', userName='', avatar}:Props) => {
  const [menuShown, setMenuShown] = useState(false);
  const wrapperRef = useRef(null);
  const { setLogout } = useUserStore()
  let noAvatar = false;
  if (userName == null) {
    userName = ''
  }
  if (avatar == null) {
    noAvatar = true
  }
  const handleClick = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
      setMenuShown(false)
    }
  }
  
  const logOutHandler = () => {
    signOut(auth).then(() => {
      setLogout()
      toast.success('Successfully signed out!', {
        icon: '✅',
      })
    }).catch((error) => {
      toast.error('Sign out failure :(', {
        icon: '⛔️',
      });
    });
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])
  
  return <div className={`${className} ${s.frame}`} ref={wrapperRef}>
      <button type={'button'} onClick={()=>setMenuShown(!menuShown)} className={s.header_user}>
        <div className={s.user_name}>{userName.substring(0, userName.indexOf('@'))}</div>
        <div className={`${s.avatar}`} >
          {noAvatar ? <img src="/user-white.svg" alt="user"/> : <div className={`${s.avatar_ico}  ${noAvatar ? '' : 'bg_img'}`} style={{backgroundImage: `url(${avatar})`}} />}
        </div>
      </button>
      
      <div className={`${s.dropdown} ${menuShown? 'showed' : ''}`}>
        <Link href={'/personal'} className={` ${s.link}`}>View profile</Link>
        <button className={s.logout_btn} onClick={logOutHandler}>
          <span>Log out</span>
          <img src="/logout.svg" alt="logout"/>
        </button>
      </div>
    </div>;
}