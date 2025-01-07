"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase/firebase-config";
import { Title } from "../ui/title";
import { usePathname, useRouter } from "next/navigation";
import { toastMessage } from "@/services/utils/toast_message";

interface Props {
  className?: string;
  modalClose: (arg: boolean) => void;
  toggleForm: (arg: boolean) => void;
}

export const RegForm: React.FC<Props> = ({
  className,
  toggleForm,
  modalClose,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const regHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toastMessage("Registration successful!", "success");
        setEmail("");
        setPassword("");
        modalClose(false);
        if (pathname.includes("login")) {
          router.push("/checkout");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toastMessage(errorMessage, "warn");
      });
  };

  return (
    <div className={className}>
      <Title text={"Registration form"} size={"md"} />
      <form className="offsets_inside bottom_offset" onSubmit={regHandler}>
        <input
          type="email"
          placeholder="Enter e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="e-mail"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        <button type="submit" className="main_btn min_wide">
          Register
        </button>
      </form>
      <div className="form_bottom_variants">
        <button onClick={() => toggleForm(false)} className="green font_md">
          Go to Login
        </button>
        <p>or</p>
      </div>
    </div>
  );
};
