"use client";
import React, { useState } from "react";
import s from "./login_section.module.scss";
import { RegistrationModal } from "../registration_modal/registration_modal";

export const LoginSection: React.FC = () => {
  const [showPs, setShowPs] = useState(false);
  return (
    <section>
      <div className="screen_content">
        <div className={s.table}>
          <div className={s.cell}>
            <RegistrationModal modalClose={setShowPs} className={s.reg} />
          </div>
        </div>
      </div>
    </section>
  );
};
