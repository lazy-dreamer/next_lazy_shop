'use client';
import React from "react";
import s from './contacts_section.module.scss';
import {Title} from "../ui/title";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {stylers} from "../../services/map_stylers";

interface Props {
  className?: string
}
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const iconUrl = '/map_pin.svg'

const center = {
  lat: 47.56194120128157, 
  lng: 13.649738679441052
};

const mapStyles:any[] = stylers;

export const ContactsSection:React.FC<Props> = ({className=''}) => {
  const key:string = process.env.NEXT_PUBLIC_MAP_KEY || ''
  return <section className={` ${className ? className: ''} ${s.frame} `}>
    <div className="screen_content">
      <Title text='Contact information' size='lg' />
      <div className="simple_text bottom_offset">
        <p><strong>Main office:</strong> Baderpl. 108, 4830 Hallstatt, Austria</p>
        <p>You can send pigeons to contact us.</p>
        <p>Also you can build the viking boat to reach us by sailing in fjords :)</p>
      </div>
      
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          options={{
            styles: mapStyles
          }}
        >
          <Marker position={center} icon={iconUrl}/>
        </GoogleMap>
      </LoadScript>

    </div>
  </section>;
}