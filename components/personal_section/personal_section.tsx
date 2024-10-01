'use client'
import React, {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "../../services/firebase-config";
import { useRouter } from 'next/navigation';
import {Preloader} from "../preloader/Preloader";
import s from './personal_section.module.scss'
import {UserCard} from "../user_card/user_card";

interface Props {
  className?: string
}

export const PersonalSection:React.FC<Props> = ({className=''}) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/')
      }
    });
  }, []);
  if (user == null) {
    return <Preloader />
  }
  
  return <section className={` ${className ? className: ''} `}>
    <div className="screen_content">
      <div className={s.info_sides}>
        <UserCard user={user} />
        <div className={s.info_side}>
          
        </div>
      </div>
    </div>
  </section>;
}