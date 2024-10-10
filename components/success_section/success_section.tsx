'use client'
import React, {useEffect, useState} from "react";
import s from './success_section.module.scss';
import {Title} from "../ui/title";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useUserStore} from "../../store/user_store";
import {saveUserCart} from "../../services/firebase/cart";
import {Preloader} from "../preloader/Preloader";
import Image from "next/image";

interface Props {
  className?: string
}

export const SuccessSection:React.FC<Props> = ({className=''}) => {
  let [counter, setCounter] = useState(10)
  const router = useRouter();
  //success
  const {user, changeCart, isCheckout, setIsCheckout} = useUserStore()
  
  useEffect(() => {
    if (!isCheckout) {
      router.push('/')
    }
    changeCart([])
    saveUserCart(user?.uid, [])
    
    return () => {
      setIsCheckout(false);
    }
  }, []);
  
  type TInterval = ReturnType<typeof setInterval> | null;
  useEffect(() => {
    const timer: TInterval = counter > 0 ? setInterval(() => setCounter(prev => prev - 1), 1000) : null;
    
    if (counter == 0) {
      router.push('/')
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter]);
  
  
  if (user == null) {
    return <Preloader />
  }
  
  return <section className={`${className && className}`}>
    <div className="screen_content">
      <div className={s.image}>
        <Image src={'/delivery-truck.svg'} alt={'delivery'} width={50} height={50} />
      </div>
      <Title text={'Success!'} size={'lg'} className={'text_center'} />
      <Title text={'Your order has been sent!'} size={'lg'} className={'text_center'} />
      <div className="main_btn_wrapper centered">
        <Link href={'/'} className={'main_btn'}><strong>Go to main page <span className="remain_counter">{counter}</span></strong></Link>
      </div>
    </div>
  </section>;
}