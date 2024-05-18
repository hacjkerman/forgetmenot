import React, { useEffect, useState } from "react";
import ColoursCSS from "./Colours.module.css";
import { HexColorPicker, HexColorInput } from "react-colorful";
export const colours = {
  Default: "#EBECF0",
  Light_Blue: "#00FFFF",
  Blue: "#0096FF",
  Dark_Blue: "#0000FF",
  Purple: "#A020F0",
  Pink: "#FF00FF",
  Red: "#ff0000",
  Dark_Orange: "#ff4d00",
  Orange: "#ff9a00",
  Yellow: "#FFEA00",
  Light_Green: "#AAFF00",
  Green: "#00FF00",
};
function Colours(props) {
  const selectedColour = props.colour;
  console.log(selectedColour);
  const setColour = props.setColour;
  const [isSelectingCustom, setIsSelectingCustom] = useState(false);
  const allColours = Object.entries(colours);
  const selectColour = (e) => {
    e.preventDefault();
    const newColour = e.target.id;
    if (newColour === selectedColour) {
      return;
    }
    setIsSelectingCustom(false);
    setColour(newColour);
  };
  const handleCustomColour = (e) => {
    e.preventDefault();
    setIsSelectingCustom(!isSelectingCustom);
    setColour("#aabbcc");
  };
  useEffect(() => {
    if (
      !Object.values(colours).includes(selectedColour) &&
      !Object.keys(colours).includes(selectedColour)
    ) {
      setIsSelectingCustom(true);
    }
  }, [selectedColour]);
  return (
    <div className={ColoursCSS.colourSelector}>
      <div className={ColoursCSS.colourBox}>
        {allColours.map((colour) => {
          const colourName = colour[0];
          const colourHex = colour[1];
          let render;
          if (
            colours[selectedColour] === colourHex ||
            selectedColour === colourName
          ) {
            render = (
              <hr
                className={ColoursCSS.selectedSwatch}
                style={{
                  backgroundColor: colourHex,
                }}
              />
            );
          }
          return (
            <div
              className={ColoursCSS.swatch}
              style={{
                backgroundColor: colourHex,
              }}
              key={colourName}
              id={colourName}
              onClick={selectColour}
            >
              {render}
            </div>
          );
        })}
      </div>
      <div className={ColoursCSS.customBox}>
        {isSelectingCustom ? (
          <div className={ColoursCSS.customColour}>
            <HexColorPicker color={selectedColour} onChange={setColour} />
            <HexColorInput
              className={ColoursCSS.colourfulInput}
              color={selectedColour}
              onChange={setColour}
            />
          </div>
        ) : (
          <div className={ColoursCSS.customise} onClick={handleCustomColour}>
            Customise
          </div>
        )}
      </div>
    </div>
  );
}

export default Colours;
