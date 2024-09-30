import React from "react";
import s from './modal_overlay.module.scss'

export const ModalOverlay: React.FC<React.PropsWithChildren>  = ({children}) => {
  return <div className={s.modal_overlay}>{children}</div>;
}