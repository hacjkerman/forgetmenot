import React from "react";
import changeEmailCSS from "./changeEmail.module.css";
import { updateUser } from "../../api/Loginapi";

function ChangeUser(props) {
  const user = props.user;
  const token = props.token;
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = e.target.value;
    await updateUser(user, newUser, token);
    handleClose(e);
  };
  return props.trigger ? (
    <div className={changeEmailCSS.popup}>
      <div className={changeEmailCSS.popupInner}>
        <div className={changeEmailCSS.popupHeader}>
          <h3 className={changeEmailCSS.headerText}>Change User</h3>
          <button className={changeEmailCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={changeEmailCSS.columnForm} onSubmit={handleSubmit}>
          <div className={changeEmailCSS.upperForm}>
            <label className={changeEmailCSS.colInput}>
              <h3>Current User</h3>
              <p>{user}</p>
            </label>
            <label className={changeEmailCSS.colInput}>
              <h3>New User</h3>
              <input type="text" placeholder="user" required></input>
            </label>
          </div>
          <div className={changeEmailCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${changeEmailCSS.cancelButton} ${changeEmailCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${changeEmailCSS.createButton} ${changeEmailCSS.button}`}
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

export default ChangeUser;
