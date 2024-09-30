'use client'
import React from "react";
import s from './header_user.module.scss'
import { signOut } from "firebase/auth";
import {auth} from "../../services/firebase-config";
import toast from 'react-hot-toast';
import Link from "next/link";

interface Props {
  className?: string,
  userName: string | null,
  avatar: string | null
}

export const HeaderUser = ({className='', userName='', avatar}:Props) => {
  if (userName == null) {
    userName = ''
  }
  if (avatar == null) {
    avatar = ''
  }
  const logOutHandler = () => {
    signOut(auth).then(() => {
      toast.success('Successfully signed out!', {
        icon: '✅',
      })
    }).catch((error) => {
      toast.error('Sign out failure :(', {
        icon: '⛔️',
      });
    });
  }
  return <div className={`${className} ${s.header_user} green`}>
    <Link href={'/personal'} className={s.user_name}>{userName.substring(0, userName.indexOf('@'))}</Link>
    {/*зробити іконку аватара більшою ніж логаут і поправити стилі в кнопці логін щоб не пригало, зробити дропдаун з лінками*/}
    <button className={s.logout_btn} onClick={logOutHandler}><img src="/logout.svg" alt="logout"/></button>
  </div>;
}