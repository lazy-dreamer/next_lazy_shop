"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const ProductModalClose: React.FC<Props> = ({ className = "" }) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
    console.log(window);
    // const previousUrl = document.referrer || "/";
    // console.log(previousUrl);
    // router.push(previousUrl, undefined, { shallow: true, scroll: false });
  };
  return <button className={"modal_close"} onClick={handleClose} />;
};
