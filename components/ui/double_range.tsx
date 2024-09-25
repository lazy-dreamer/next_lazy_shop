import React, {SetStateAction} from "react";
import {IRangeState} from "../shop_filters/shop_filters";
import {getTrackBackground, Range} from "react-range";
import {Dispatch} from "react/index";

interface Props {
  className?: string,
  rangeState: IRangeState,
  vals: number[],
  setVals: Dispatch<SetStateAction<number[]>>,
  placeholder?: string
}

export const DoubleRange:React.FC<Props> = ({className='', rangeState, vals, setVals, placeholder="Select your value"}) => {
  return <Range
    className={className}
    label={placeholder}
    step={rangeState.step}
    min={rangeState.min}
    max={rangeState.max}
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
            values:vals,
            colors: ["#ccc", "#15CEA1", "#ccc"],
            min: rangeState.min,
            max: rangeState.max,
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
          borderRadius: '50%',
          backgroundColor: "#15CEA1",
        }}
      />
    )}
  />
}
