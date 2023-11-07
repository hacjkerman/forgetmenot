import React from "react";
import newColumnCSS from "./newColumn.module.css";

function NewColumn(props) {
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleDuplicate = (e) => {
    // ADD POPUP
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const column = e.target[0].value;
    const columnOrder = props.columnOrder;
    if (columnOrder.find((columnName) => columnName === column)) {
      handleDuplicate(e);
      handleClose(e);
      return { error: "Duplicate Column" };
    } else {
      const addColumn = props.addColumn;
      const user = props.user;
      await addColumn(user, column);
      handleClose(e);
    }
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
