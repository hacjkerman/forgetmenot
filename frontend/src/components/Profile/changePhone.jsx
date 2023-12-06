import React from "react";
import changePhoneCSS from "./changePhone.module.css";

function changePhone(props) {
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
    <div className={changePhoneCSS.popup}>
      <div className={changePhoneCSS.popupInner}>
        <div className={changePhoneCSS.popupHeader}>
          <h3 className={changePhoneCSS.headerText}>New Column</h3>
          <button className={changePhoneCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={changePhoneCSS.columnForm} onSubmit={handleSubmit}>
          <div className={changePhoneCSS.upperForm}>
            <label className={changePhoneCSS.colInput}>
              <h3>Column Name</h3>
              <input type="text" placeholder="Habits" required></input>
            </label>
          </div>
          <div className={changePhoneCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${changePhoneCSS.cancelButton} ${changePhoneCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${changePhoneCSS.createButton} ${changePhoneCSS.button}`}
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

export default changePhone;
