import React, { useContext, useEffect, useState } from "react";
import updateColumnCSS from "./updateColumn.module.css";
import { TodoContext } from "../../contexts/TodoContext";
import toast from "react-hot-toast";
import Colours from "../../features/colourSwatch/components/colourWheel/colours";
import {
  colours,
  getKeyByValue,
} from "../../features/colourSwatch/components/colourWheel/colours";

function UpdateColumn(props) {
  const { changeColumn } = useContext(TodoContext);
  const isUpdatingCol = props.isUpdatingCol;
  const [selectedColour, setSelectedColour] = useState("Default");
  const setIsUpdatingCol = props.setIsUpdatingCol;
  const column = props.column;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingCol(!isUpdatingCol);
  };

  const handleUpdateCol = async (e) => {
    e.preventDefault();
    let newColumn = e.target[0].value;
    if (newColumn === "") {
      newColumn = column;
    }
    if (newColumn.length > 20) {
      toast.error("Column name is longer than 20 characters!");
      return;
    }
    await changeColumn(column, selectedColour, newColumn);
    handleClose(e);
  };
  const currColour = getKeyByValue(colours, props.colour);
  useEffect(() => {
    if (!currColour) {
      setSelectedColour(props.colour);
    } else {
      setSelectedColour(currColour);
    }
  }, []);
  return (
    <div className={updateColumnCSS.popup}>
      <div
        className={updateColumnCSS.popupInner}
        style={{
          borderWidth: "0.3rem",
          borderStyle: "solid",
          borderColor: props.colour,
        }}
      >
        <div className={updateColumnCSS.popupHeader}>
          <h3 className={updateColumnCSS.headerText}>Update Column Name</h3>
          <button className={updateColumnCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={updateColumnCSS.columnForm} onSubmit={handleUpdateCol}>
          <div className={updateColumnCSS.upperForm}>
            <label className={updateColumnCSS.colInput}>
              <h3>Current Column Name</h3>
              <div>{column}</div>
            </label>
            <label className={updateColumnCSS.colInput}>
              <h3>New Column Name</h3>
              <input type="input" placeholder="Weekly Todo"></input>
            </label>
            <label className={updateColumnCSS.colInput}>
              <h3>Column Colour</h3>
              <div className={updateColumnCSS.currColour}>
                {selectedColour ? selectedColour.replace("_", " ") : <></>}
              </div>
              <Colours colour={selectedColour} setColour={setSelectedColour} />
            </label>
          </div>
          <div className={updateColumnCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${updateColumnCSS.cancelButton} ${updateColumnCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${updateColumnCSS.createButton} ${updateColumnCSS.button}`}
            >
              Update
            </button>
          </div>
        </form>

        {props.children}
      </div>
    </div>
  );
}

export default UpdateColumn;
