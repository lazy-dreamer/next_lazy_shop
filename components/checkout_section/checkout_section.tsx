'use client'
import React, {useEffect, useState} from "react";
import s from './checkout_section.module.scss';
import {onAuthStateChanged, User} from "@firebase/auth";
import {usePathname, useRouter} from "next/navigation";
import {auth} from "../../services/firebase/firebase-config";
import {Preloader} from "../preloader/Preloader";
import {Title} from "../ui/title";
import {CartInfo} from "../cart_info/cart_info";
import Link from "next/link";
import {useUserStore} from "../../store/user_store";

interface Props {
  className?: string
}

export const CheckoutSection:React.FC<Props> = ({className=''}) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();
  const pathname = usePathname()
  const {cart, isCartLoaded} = useUserStore()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        if (pathname.includes('checkout')) {
          router.push('/')
        }
      }
    });
    
    return () => {
      unsub();
    }
  }, []);
  if (user == null) {
    return <Preloader />
  }
  return <section className={`${className && className}`}>
    <div className="screen_content">
      <div className={s.sides}>
        <div className={s.blocks}>
          <Title text={'User information'} size={'xs'} />
          <div className="frame with_offset">
            <div className="form_elements">
              <div className="form_element half">
                <div className="fe_title">Name</div>
                <input placeholder={''} type="text"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Surname</div>
                <input placeholder={''} type="text"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Email</div>
                <input placeholder={''} type="email"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Phone</div>
                <input placeholder={''} type="tel"/>
              </div>
            </div>
          </div>
          
          <Title text={'Address information'} size={'xs'} />
          <div className="frame with_offset">
            <div className="form_elements">
              <div className="form_element half">
                <div className="fe_title">City</div>
                <input placeholder={''} type="text"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Street</div>
                <input placeholder={''} type="text"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Building</div>
                <input placeholder={''} type="text"/>
              </div>
              <div className="form_element half">
                <div className="fe_title">Apartment</div>
                <input placeholder={''} type="text"/>
              </div>
            </div>
          </div>
  
          <Title text={'Additional comment to your order'} size={'xs'} />
          <div className="frame with_offset">
            <div className="form_elements negative_down">
              <div className="form_element">
                <textarea name="" id=""></textarea>
              </div>
            </div>
          </div>
          
        </div>
        <div className={s.aside}>
          <Title text={'Order info'} size={'xs'} />
          <CartInfo />
          <Link href={'/cart'} className={'main_btn min_wide dark_btn with_offset'}>Go back to cart</Link>
          <Link href={'/'} className={'main_btn min_wide with_offset'}>Order!</Link>
        </div>
      </div>
    </div>
  </section>;
}