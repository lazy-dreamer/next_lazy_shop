"use client";
import React, { useEffect, useState } from "react";
import s from "./checkout_section.module.scss";
import { onAuthStateChanged, User } from "@firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/services/firebase/firebase-config";
import { Preloader } from "../preloader/Preloader";
import { Title } from "../ui/title";
import { CartInfo } from "../cart_info/cart_info";
import Link from "next/link";
import { useUserStore } from "@/store/user_store";
import { useForm } from "react-hook-form";
import {
  ICheckoutForm,
  IOrder,
  saveUserOrders,
} from "@/services/firebase/orders";
import { MONTHS } from "@/services/constants";
import { saveUserInfo } from "@/services/firebase/user_info";
import { toastMessage } from "@/services/utils/toast_message";

interface Props {
  className?: string;
}

export const CheckoutSection: React.FC<Props> = ({ className = "" }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo, cart, setIsCheckout, orders, setOrders, setUserInfo } =
    useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.name || "",
      surname: userInfo?.surname || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      city: userInfo?.city || "",
      street: userInfo?.street || "",
      building: userInfo?.building || "",
      apartment: userInfo?.apartment || "",
      comment: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        if (pathname.includes("checkout")) {
          router.push("/");
        }
      }
    });

    return () => {
      unsubscribe();
    };
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
        apartment: userInfo.apartment,
      });
    }
  }, [userInfo, reset]);

  if (user == null) {
    return <Preloader />;
  }

  const phoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "e" || e.key === "-") {
      e.preventDefault();
    }
  };

  const onSubmit = (data: ICheckoutForm) => {
    if (
      userInfo?.name.length == 0 &&
      userInfo.surname.length == 0 &&
      userInfo.phone.length == 0 &&
      userInfo.email.length == 0
    ) {
      let dta = {
        ...data,
      };
      delete dta.comment;

      setUserInfo(data);
      saveUserInfo(user.uid, data);
    }
    const d = new Date();
    let fullDate = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    let orderTime = `${d.getHours()}:${d.getMinutes()}`;

    const order: IOrder = {
      orderDate: fullDate,
      orderTime: orderTime,
      cartItems: cart,
      orderInfo: data,
    };

    setIsCheckout(true);
    setOrders([...orders, order]);
    saveUserOrders(user.uid, [...orders, order]);
    toastMessage("Your order has been sent!");
    router.push("/success");
  };

  return (
    <section className={`${className}`}>
      <div className="screen_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.sides}>
            <div className={s.blocks}>
              <Title text={"User information"} size={"xs"} />
              <div className="frame with_offset">
                <div className="form_elements">
                  <div className="form_element half">
                    <div className="fe_title">Name</div>
                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "Minimum 3 chars.",
                        },
                      })}
                      className={errors.name && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Surname</div>
                    <input
                      type="text"
                      {...register("surname", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "Minimum 3 chars.",
                        },
                      })}
                      className={errors.surname && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Email</div>
                    <input
                      {...register("email", {
                        required: "required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                      type="email"
                      className={errors.email && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Phone</div>
                    <input
                      type="number"
                      {...register("phone", {
                        required: true,
                        minLength: {
                          value: 6,
                          message: "Minimum 8 chars.",
                        },
                        maxLength: 12,
                      })}
                      onKeyDown={phoneKeyPress}
                      className={errors.phone && "error"}
                    />
                  </div>
                </div>
              </div>

              <Title text={"Address information"} size={"xs"} />
              <div className="frame with_offset">
                <div className="form_elements">
                  <div className="form_element half">
                    <div className="fe_title">City</div>
                    <input
                      type="text"
                      {...register("city", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "Minimum 3 chars.",
                        },
                      })}
                      className={errors.city && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Street</div>
                    <input
                      type="text"
                      {...register("street", {
                        required: true,
                        minLength: {
                          value: 3,
                          message: "Minimum 3 chars.",
                        },
                      })}
                      className={errors.street && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Building</div>
                    <input
                      type="text"
                      {...register("building", {
                        required: true,
                        minLength: {
                          value: 1,
                          message: "Minimum 1 chars.",
                        },
                      })}
                      className={errors.building && "error"}
                    />
                  </div>
                  <div className="form_element half">
                    <div className="fe_title">Apartment</div>
                    <input
                      type="text"
                      {...register("apartment", {
                        required: true,
                        minLength: {
                          value: 1,
                          message: "Minimum 1 chars.",
                        },
                      })}
                      className={errors.apartment && "error"}
                    />
                  </div>
                </div>
              </div>
              <Title text={"Additional comment to your order"} size={"xs"} />
              <div className="frame with_offset">
                <div className="form_elements negative_down">
                  <div className="form_element">
                    <textarea {...register("comment")} />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.aside}>
              <Title text={"Order info"} size={"xs"} />
              <CartInfo />
              <Link
                href={"/cart"}
                className={"main_btn min_wide dark_btn with_offset"}
              >
                Go back to cart
              </Link>
              <button className="main_btn min_wide" type="submit">
                <span>Order!</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
