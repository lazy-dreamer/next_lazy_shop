import React from "react";
import s from "./modal_overlay.module.scss";

interface Props {
  className?: string;
}

export const ModalOverlay: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`${s.modal_overlay} ${className ? className : ""}`}>
      {children}
    </div>
  );
};
