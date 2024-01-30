import React from "react";
import changePhoneCSS from "./changePhone.module.css";
import { updatePhone } from "../../api/Loginapi";

function ChangePhone(props) {
  const token = props.token;
  const phone = props.phone;
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNumber = e.target[0].value;
    const user = props.user;
    await updatePhone(user, newNumber, token);
    handleClose(e);
  };
  return props.trigger ? (
    <div className={changePhoneCSS.popup}>
      <div className={changePhoneCSS.popupInner}>
        <div className={changePhoneCSS.popupHeader}>
          <h3 className={changePhoneCSS.headerText}>Change Number</h3>
          <button className={changePhoneCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={changePhoneCSS.columnForm} onSubmit={handleSubmit}>
          <div className={changePhoneCSS.upperForm}>
            <label className={changePhoneCSS.colInput}>
              <h3>Current Number</h3>
              <p>{phone}</p>
            </label>
            <label className={changePhoneCSS.colInput}>
              <h3>New Number</h3>
              <input type="number" placeholder="04040404040" required></input>
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

export default ChangePhone;
