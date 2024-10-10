'use client'
import React, {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "../../services/firebase/firebase-config";
import {usePathname, useRouter} from 'next/navigation';
import {Preloader} from "../preloader/Preloader";
import {UserCard} from "../user_card/user_card";
import {Title} from "../ui/title";
import {useForm} from "react-hook-form";
import {useUserStore} from "../../store/user_store";
import {IFullUserInfo, saveUserInfo} from "../../services/firebase/user_info";
import toast from "react-hot-toast";
import {signOut} from "firebase/auth";

interface Props {
  className?: string
}

export const PersonalSection:React.FC<Props> = ({className=''}) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter();
  const pathname = usePathname()
  const {userInfo, setUserInfo, setLogout} = useUserStore()
  // console.log(userInfo)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.name || '',
      surname: userInfo?.surname || '',
      email: userInfo?.email || '',
      phone: userInfo?.phone || '',
      city: userInfo?.city || '',
      street: userInfo?.street || '',
      building: userInfo?.building || '',
      apartment: userInfo?.apartment || ''
    }
  });
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        if (pathname.includes('personal')) {
          router.push('/')
        }
      }
    });
  
    return () => {
      unsub();
    }
  }, []);
  
  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        phone: userInfo.phone,
        city: userInfo.city,
        street: userInfo.street,
        building: userInfo.building,
        apartment: userInfo.apartment
      });
    }
  }, [userInfo, reset]);
  
  if (user == null) {
    return <Preloader />
  }
  
  const phoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  }
  
  const onSubmit = (data:IFullUserInfo)=> {
    setUserInfo(data);
    saveUserInfo(user.uid, data);
    toast.success('Information successfully saved!', {
      icon: '✅',
    })
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
  
  return <section className={` ${className ? className: ''} `}>
    <div className="screen_content">
      <div className='user_info_sides'>
        <UserCard user={user} />
        <div className="user_info_side">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*start fields*/}
            <Title text={'User information'} size={'xs'} />
            <div className="frame with_offset">
              <div className="form_elements">
                <div className="form_element half">
                  <div className="fe_title">Name</div>
                  <input type='text' {...register('name')} className={errors.name && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Surname</div>
                  <input type='text' {...register('surname')} className={errors.surname && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Email</div>
                  <input
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                      }
                    })} type="email" className={errors.email && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Phone</div>
                  <input type='number' {...register('phone', {
                    required: true,
                    minLength: {
                      value: 6,
                      message: 'Minimum 8 chars.'
                    },
                    maxLength: 12,
                  })} onKeyDown={phoneKeyPress} className={errors.phone && 'error'} />
                </div>
              </div>
            </div>
    
            <Title text={'Address information'} size={'xs'} />
            <div className="frame with_offset">
              <div className="form_elements">
                <div className="form_element half">
                  <div className="fe_title">City</div>
                  <input type='text' {...register('city')} className={errors.city && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Street</div>
                  <input type='text' {...register('street')} className={errors.street && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Building</div>
                  <input type='text' {...register('building')} className={errors.building && 'error'} />
                </div>
                <div className="form_element half">
                  <div className="fe_title">Apartment</div>
                  <input type='text' {...register('apartment')} className={errors.apartment && 'error'} />
                </div>
              </div>
            </div>
            <div className="main_btn_wrapper">
              <button className="main_btn" type="submit">
                <span>Save info</span>
              </button>
              <button className="main_btn dark_btn" type="button" onClick={logOutHandler}>
                <span>Log out</span>
              </button>
            </div>
            {/*end fields*/}
          </form>
        </div>
      </div>
    </div>
  </section>;
}