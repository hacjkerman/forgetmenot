import React, { useContext, useState } from "react";
import newColumnCSS from "./newColumn.module.css";
import { TodoContext } from "../../contexts/TodoContext";
import toast from "react-hot-toast";
import Colours from "../../features/colourSwatch/components/colourWheel/colours";

function NewColumn(props) {
  const { addColumn } = useContext(TodoContext);
  const [selectedColour, setSelectedColour] = useState("Default");
  const handleClose = (e) => {
    e.preventDefault();
    props.setIsAddingEnd(!props.isAddingEnd);
  };
  const handleDuplicate = (e) => {
    // ADD POPUP
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const column = e.target[0].value;
    const columnOrder = props.columnOrder;
    const currCol = props.currCol;
    if (column.length > 20) {
      toast.error("Column name is longer than 20 characters!");
      return;
    }
    if (columnOrder.find((columnName) => columnName === column)) {
      toast.error("Duplicate Column");
      handleDuplicate(e);
      handleClose(e);
      return { error: "Duplicate Column" };
    } else {
      await addColumn(column, selectedColour, currCol);
      handleClose(e);
    }
  };
  return props.isAddingEnd ? (
    <div className={newColumnCSS.popup}>
      <div className={newColumnCSS.popupInner}>
        <div className={newColumnCSS.popupHeader}>
          <h3 className={newColumnCSS.headerText}>New Column</h3>
          <button className={newColumnCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={newColumnCSS.columnForm} onSubmit={handleSubmit}>
          <div className={newColumnCSS.upperForm}>
            <label className={newColumnCSS.colInput}>
              <h3>Column Name</h3>
              <input type="text" placeholder="Habits" required></input>
            </label>
            <label className={newColumnCSS.colInput}>
              <h3>Column Colour</h3>
              <div className={newColumnCSS.currColour}>
                {selectedColour ? selectedColour.replace("_", " ") : <></>}
              </div>
              <Colours colour={selectedColour} setColour={setSelectedColour} />
            </label>
          </div>
          <div className={newColumnCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${newColumnCSS.cancelButton} ${newColumnCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${newColumnCSS.createButton} ${newColumnCSS.button}`}
            >
              Create
            </button>
          </div>
        </form>

        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default NewColumn;
