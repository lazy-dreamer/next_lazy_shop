'use client'
import React from "react";
import {useRouter} from "next/navigation";

interface Props {
  className?: string
}

export const ProductModalClose:React.FC<Props> = ({className=''}) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return <button className={'modal_close'} onClick={handleClose} />;
}