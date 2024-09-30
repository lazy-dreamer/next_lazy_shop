'use client'
import React, {useEffect} from "react";
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "../../services/firebase-config";
import { useRouter } from 'next/navigation';

interface Props {
  className?: string
}

export const PersonalSection:React.FC<Props> = ({className=''}) => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
      } else {
        console.log(user, '  --- null')
        router.push('/')
      }
    });
  }, [auth]);
  return <section className={` ${className ? className: ''} `}>
    <div className="screen_content">
      <p>personalSection</p>
    </div>
  </section>;
}