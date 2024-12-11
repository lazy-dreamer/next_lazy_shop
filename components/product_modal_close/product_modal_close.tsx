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
    // const previousUrl = document.referrer || "/";
    // console.log(previousUrl, document.referrer);
    // console.log("referrer", document.referrer);
    // router.push(previousUrl, { scroll: false });
  };
  return <button className={"modal_close"} onClick={handleClose} />;
};
