"use client";
import React from "react";
import s from "./contacts_section.module.scss";
import { Title } from "../ui/title";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { STYLERS } from "@/services/mock/map_stylers";
import { MAP_SETTINGS } from "@/services/mock/map_settings";

interface Props {
  className?: string;
}

const mapStyles: any[] = STYLERS;

export const ContactsSection: React.FC<Props> = ({ className = "" }) => {
  const key: string = process.env.NEXT_PUBLIC_MAP_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

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
        {!isLoaded ? (
          <div>Loading...</div>
        ) : loadError ? (
          <div>Error loading map</div>
        ) : (
          <div className={s.map}>
            <GoogleMap
              mapContainerStyle={MAP_SETTINGS.mapContainerStyle}
              center={MAP_SETTINGS.center}
              zoom={MAP_SETTINGS.zoom}
              options={{
                styles: mapStyles,
              }}
            >
              <Marker
                position={MAP_SETTINGS.center}
                icon={MAP_SETTINGS.iconUrl}
              />
            </GoogleMap>
          </div>
        )}
      </div>
    </section>
  );
};
