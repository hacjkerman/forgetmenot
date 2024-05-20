import React from "react";
import changeEmailCSS from "./changeEmail.module.css";
function changePassword(props) {
  //   const user = props.user;
  //   const token = props.token;
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newPassword = e.target[0].value;
    // await updatePassword(user, newPassword, token);
    handleClose(e);
  };
  return (
    <div className={changeEmailCSS.popup}>
      <div className={changeEmailCSS.popupInner}>
        <div className={changeEmailCSS.popupHeader}>
          <h3 className={changeEmailCSS.headerText}>Change Password</h3>
          <button className={changeEmailCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={changeEmailCSS.columnForm} onSubmit={handleSubmit}>
          <div className={changeEmailCSS.upperForm}>
            <label className={changeEmailCSS.colInput}>
              <h3>New Password</h3>
              <input
                type="text"
                placeholder="SecurePasword123!"
                required
              ></input>
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
  );
}

export default changePassword;
