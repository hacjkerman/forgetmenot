import React, { useContext } from "react";
import updateColumnCSS from "./updateColumn.module.css";
import { TodoContext } from "../../contexts/TodoContext";
import toast from "react-hot-toast";

function UpdateColumn(props) {
  const { changeColumn } = useContext(TodoContext);
  const isUpdatingCol = props.isUpdatingCol;
  const setIsUpdatingCol = props.setIsUpdatingCol;
  const column = props.column;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingCol(!isUpdatingCol);
  };

  const handleUpdateCol = (e) => {
    e.preventDefault();
    const newColumn = e.target[0].value;
    if (newColumn.length > 20) {
      toast.error("Column name is longer than 20 characters!");
      return;
    }
    changeColumn(column, newColumn);
    handleClose(e);
  };
  return props.isUpdatingCol ? (
    <div className={updateColumnCSS.popup}>
      <div className={updateColumnCSS.popupInner}>
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
              <input type="input" placeholder="Weekly Todo" required></input>
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
  ) : (
    ""
  );
}

export default UpdateColumn;
