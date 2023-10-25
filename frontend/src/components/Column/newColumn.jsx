import React from "react";
import newColumnCSS from "./newColumn.module.css";
import { storeColumn } from "../../api/Columnapi";

function NewColumn(props) {
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const column = e.target[0].value;
    storeColumn("dies34", column);
    handleClose(e);
  };
  return props.trigger ? (
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
