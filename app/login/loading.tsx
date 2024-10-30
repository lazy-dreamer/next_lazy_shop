import React from "react";
import {Preloader} from "../../components/preloader/Preloader";

export default function LoadingLogin() {
  return (
    <section>
      <div className="screen_content">{<Preloader/>}</div>
    </section>
  );
}
