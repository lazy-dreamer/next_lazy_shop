"use client";
import React, { useState } from "react";
import s from "./registration_modal.module.scss";
import { LoginForm } from "../login_form/LoginForm";
import { RegForm } from "../reg_form/RegForm";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "@/services/firebase/firebase-config";
import { usePathname, useRouter } from "next/navigation";
import { toastMessage } from "@/services/utils/toast_message";

interface Props {
  className?: string;
  modalClose: (arg: boolean) => void;
}

export const RegistrationModal: React.FC<Props> = ({
  className = "",
  modalClose,
}) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const googleAuthHandler = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toastMessage("Login successful!");
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
    <div className={`${className} ${s.reg_modal}`}>
      <button className="modal_close" onClick={() => modalClose(false)} />
      {isRegistration ? (
        <RegForm
          modalClose={modalClose}
          toggleForm={setIsRegistration}
          className="offsets_inside"
        />
      ) : (
        <LoginForm
          modalClose={modalClose}
          toggleForm={setIsRegistration}
          className="offsets_inside"
        />
      )}
      {
        <p className="variant_line pt_xs">
          <span>Sign in with</span>
          <button className="google_btn" onClick={googleAuthHandler}>
            <img src="/google.png" alt="google ico" /> <span>Google</span>
          </button>
        </p>
      }
    </div>
  );
};
