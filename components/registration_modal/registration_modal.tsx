"use client";
import React, { useState } from "react";
import s from "./registration_modal.module.scss";
import { LoginForm } from "../LoginForm";
import { RegForm } from "../RegForm";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../services/firebase/firebase-config";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  className?: string;
  modalClose: (arg: boolean) => void;
}

export const RegistrationModal: React.FC<Props> = ({
  className,
  modalClose,
}) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const googleAuthHandler = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login successful!", {
          icon: "✅",
        });
        modalClose(false);
        if (pathname.includes("login")) {
          router.push("/checkout");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          icon: "⛔️",
        });
      });
  };

  return (
    <div className={`${className ? className : ""} ${s.reg_modal}`}>
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
