"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const ProductModalClose: React.FC = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return <button className={"modal_close"} onClick={handleClose} />;
};
