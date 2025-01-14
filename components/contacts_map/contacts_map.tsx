"use client";
import React from "react";
import { MAP_SETTINGS } from "@/services/mock/map_settings";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export const ContactsMap: React.FC = () => {
  const key: string = process.env.NEXT_PUBLIC_MAP_KEY || "";
  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={key}
    >
      <Map
        defaultZoom={MAP_SETTINGS.zoom}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        style={MAP_SETTINGS.mapContainerStyle}
        defaultCenter={MAP_SETTINGS.center}
        gestureHandling={"cooperative"}
        disableDefaultUI={false}
      >
        <AdvancedMarker position={MAP_SETTINGS.center} title={"Hallstatt"}>
          <img
            src={MAP_SETTINGS.iconUrl}
            alt="Hallstatt"
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};
