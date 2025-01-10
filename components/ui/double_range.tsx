"use client";
import React from "react";
import { getTrackBackground, Range } from "react-range";
import { SHOP_DEFAULTS } from "@/services/mock/shop_defaults";

interface Props {
  vals: number[];
  setVals: (values: number[]) => void;
  placeholder?: string;
}

export const DoubleRange: React.FC<Props> = ({
  vals,
  setVals,
  placeholder = "Select your value",
}) => {
  return (
    <Range
      label={placeholder}
      step={SHOP_DEFAULTS.price_range_step}
      min={SHOP_DEFAULTS.price_min}
      max={SHOP_DEFAULTS.price_max}
      values={vals}
      onChange={(values) => setVals(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "3px",
            width: "100%",
            background: getTrackBackground({
              values: vals,
              colors: ["#ccc", "#15CEA1", "#ccc"],
              min: SHOP_DEFAULTS.price_min,
              max: SHOP_DEFAULTS.price_max,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            backgroundColor: "#15CEA1",
          }}
        />
      )}
    />
  );
};
