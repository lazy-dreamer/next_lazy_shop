import React from "react";
import {Preloader} from "../../../../components/preloader/Preloader";
import {ModalOverlay} from "../../../../components/modal_overlay/modal_overlay";


export default function LoadingAbout() {
  return <ModalOverlay className={'top_overlay'}>
    <div className="screen_content">
      {
        <Preloader />
      }
    </div>
  </ModalOverlay>
}