"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./header_user.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase/firebase-config";
import Link from "next/link";
import { useUserStore } from "@/store/user_store";
import axios from "axios";
import { createProductList } from "@/services/defaults/create_product_list";
import { getRandomNumber } from "@/services/utils/random_number";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchValues } from "@/hooks/use_search_values";
import { toastMessage } from "@/services/utils/toast_message";

interface Props {
  className?: string;
  userName: string | null;
  avatar: string | null;
}

export const HeaderUser = ({
  className = "",
  userName = "",
  avatar,
}: Props) => {
  const [menuShown, setMenuShown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { setLogout } = useUserStore();
  const { paramsString } = useSearchValues();
  const queryClient = useQueryClient();

  let noAvatar = false;
  if (userName == null) {
    userName = "";
  }
  if (avatar == null) {
    noAvatar = true;
  }
  const handleClick = (
    event: React.MouseEvent<Document, MouseEvent> | MouseEvent,
  ) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as HTMLElement)
    ) {
      setMenuShown(false);
    }
  };

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        setLogout();
        setMenuShown(false);
        localStorage.setItem("localCartItems", "[]");
        toastMessage("Successfully signed out!", "success");
      })
      .catch(() => {
        toastMessage("Sign out failure :(", "warn");
      });
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const productMutation = useMutation({
    mutationFn: async (productNumber: number) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}products/`,
        {
          ...createProductList[productNumber],
          title: `LS product ${new Date().toLocaleTimeString()}`,
        },
      );
      return response.data;
    },
    onError: (error: any) => {
      console.log(`Error occurred: ${error.message || error}`);
      toastMessage("Product creation failed!", "warn");
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["products", "productsList", paramsString],
        refetchType: "active",
      });
      toastMessage("Product created successfully!", "success");
    },
  });
  const categoryMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}categories/`,
        {
          name: `LS category ${new Date().toLocaleTimeString()}`,
          image: "https://picsum.photos/640/640",
        },
      );
      return response.data;
    },
    onError: (error: any) => {
      console.log(`Error occurred: ${error.message || error}`);
      toastMessage("Category creation failed!", "warn");
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "categoriesList"],
        refetchType: "active",
      });
      toastMessage("Category created successfully!", "success");
    },
  });

  return (
    <div className={`${className} ${s.frame}`} ref={wrapperRef}>
      <button
        type={"button"}
        onClick={() => setMenuShown(!menuShown)}
        className={s.header_user}
      >
        <div className={s.user_name}>
          {userName.substring(0, userName.indexOf("@"))}
        </div>
        <div className={`${s.avatar}`}>
          {noAvatar ? (
            <img src="/user-white.svg" alt="user" />
          ) : (
            <div
              className={`${s.avatar_ico}  ${noAvatar ? "" : "bg_img"}`}
              style={{ backgroundImage: `url(${avatar})` }}
            />
          )}
        </div>
      </button>

      <div className={`${s.dropdown} ${menuShown ? "showed" : ""}`}>
        <Link
          href={"/personal"}
          className={` ${s.link}`}
          onClick={() => setMenuShown(false)}
        >
          View profile
        </Link>
        <Link
          href={"/orders"}
          className={` ${s.link}`}
          onClick={() => setMenuShown(false)}
        >
          Your orders
        </Link>
        <button
          className={s.create}
          onClick={() =>
            productMutation.mutate(getRandomNumber(createProductList.length))
          }
        >
          Create random product
        </button>
        <button className={s.create} onClick={() => categoryMutation.mutate()}>
          Create new category
        </button>
        <button className={s.logout_btn} onClick={logOutHandler}>
          <span>Log out</span>
          <img src="/logout.svg" alt="logout" />
        </button>
      </div>
    </div>
  );
};
