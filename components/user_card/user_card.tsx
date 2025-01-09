import React from "react";
import s from "./user_card.module.scss";
import { User } from "@firebase/auth";
import { Title } from "../ui/title";

interface Props {
  className?: string;
  user: User;
}

export const UserCard: React.FC<Props> = ({ className = "", user }) => {
  const { displayName, email, photoURL, providerData, metadata } = user;
  let noAvatar = false;
  let userName = displayName || "";
  if (userName.length == 0 && email) {
    userName = email.substring(0, email.indexOf("@"));
  }
  if (photoURL == null) {
    noAvatar = true;
  }
  return (
    <div className={` ${className} ${s.frame}`}>
      <div className={`${s.avatar}`}>
        {noAvatar ? (
          <img src="/user-white.svg" alt="user" />
        ) : (
          <div
            className={`${s.avatar_ico}  ${noAvatar ? "" : "bg_img"}`}
            style={{ backgroundImage: `url(${photoURL})` }}
          />
        )}
      </div>
      <div className={s.info_body}>
        <Title text={userName} size={"sm"} />
        <p>
          <strong>Email:</strong> <br />
          {email}
        </p>
        <p>
          <strong>Registered with:</strong> <br />
          {providerData[0].providerId == "password"
            ? "email and password"
            : providerData[0].providerId}
        </p>
        <p>
          <strong>Registration date:</strong> <br />
          {metadata.creationTime}
        </p>
      </div>
    </div>
  );
};
