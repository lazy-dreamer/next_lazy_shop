import React from "react";
import { Preloader } from "../../components/preloader/Preloader";

export default function LoadingFavorites() {
  return (
    <section>
      <div className="screen_content">{<Preloader />}</div>
    </section>
  );
}
