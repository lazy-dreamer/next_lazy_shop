"use client";
import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../services/firebase/firebase-config";
import toast from "react-hot-toast";
import {Title} from "./ui/title";

interface Props {
  className?: string;
  modalClose: (arg: boolean) => void;
  toggleForm: (arg: boolean) => void;
}

export const LoginForm: React.FC<Props> = ({className, toggleForm, modalClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login successful!", {
          icon: "✅",
        });
        setEmail("");
        setPassword("");
        modalClose(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          icon: "⛔️",
        });
      });
  };
  
  return (
    <div className={className}>
      <Title text={"Login form"} size={"md"}/>
      <form className="offsets_inside bottom_offset" onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="e-mail"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <button type="submit" className="main_btn min_wide">Login</button>
      </form>
      <div className="form_bottom_variants">
        <button onClick={() => toggleForm(true)} className="green font_md">Go to Registration</button>
        <p>or</p>
      </div>
    </div>
  );
};
