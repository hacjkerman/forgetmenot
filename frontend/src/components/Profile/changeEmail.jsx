import React, { useEffect, useState } from "react";
import changeEmailCSS from "./changeEmail.module.css";
import { updateEmail, getEmail } from "../../api/Loginapi";

function ChangeEmail(props) {
  const user = props.user;
  const token = props.token;
  const [email, setEmail] = useState("");
  useEffect(() => {
    async function getReq() {
      const request = await getEmail(user, token);
      console.log(request);
      setEmail(request.email);
    }
    getReq();
  }, []);
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
      await updateEmail(user, column);
      handleClose(e);
    }
  };
  return props.trigger ? (
    <div className={changeEmailCSS.popup}>
      <div className={changeEmailCSS.popupInner}>
        <div className={changeEmailCSS.popupHeader}>
          <h3 className={changeEmailCSS.headerText}>Change Email</h3>
          <button className={changeEmailCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={changeEmailCSS.columnForm} onSubmit={handleSubmit}>
          <div className={changeEmailCSS.upperForm}>
            <label className={changeEmailCSS.colInput}>
              <h3>Current Email</h3>
              <p>{email}</p>
            </label>
            <label className={changeEmailCSS.colInput}>
              <h3>New Email</h3>
              <input type="text" placeholder="Habits" required></input>
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

export default ChangeEmail;
