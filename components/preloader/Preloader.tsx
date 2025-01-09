import React from "react";
import styles from "./preloader.module.scss";

type TClass = {
  customClass?: string;
};

export const Preloader: React.FC<TClass> = ({ customClass = "" }) => {
  return (
    <div className={styles.preloader_wrapper + ` ` + customClass}>
      <div className={styles.ring} />
    </div>
  );
};
