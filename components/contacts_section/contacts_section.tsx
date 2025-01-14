import React from "react";
import s from "./contacts_section.module.scss";
import { Title } from "../ui/title";
import { ContactsMap } from "@/components/contacts_map/contacts_map";

interface Props {
  className?: string;
}

export const ContactsSection: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={`${className} ${s.frame} `}>
      <div className="screen_content">
        <Title text="Contact information" size="lg" />
        <div className="simple_text bottom_offset">
          <p>
            <strong>Main office:</strong> Baderpl. 108, 4830 Hallstatt, Austria
          </p>
          <p>You can send pigeons to contact us.</p>
          <p>
            Also you can build the viking boat to reach us by sailing in fjords
            :)
          </p>
        </div>
        <div className={s.map}>
          <ContactsMap />
        </div>
      </div>
    </section>
  );
};
