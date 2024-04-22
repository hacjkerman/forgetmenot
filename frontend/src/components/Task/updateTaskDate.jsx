import React from "react";
import updateTaskCSS from "./updateTask.module.css";

function UpdateTaskDate(props) {
  const isUpdatingDate = props.isUpdatingDate;
  const setIsUpdatingDate = props.setIsUpdatingDate;
  const task = props.task;
  const column = props.column;
  const changeTodoDate = props.changeTodoDate;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingDate(!isUpdatingDate);
  };

  const handleUpdateDate = (e) => {
    e.preventDefault();
    const newDate = e.target[0].value;
    changeTodoDate(column, task.id, newDate);
    handleClose(e);
    return;
  };
  return (
    <div className={updateTaskCSS.popup}>
      <div className={updateTaskCSS.popupInner}>
        <div className={updateTaskCSS.popupHeader}>
          <h3 className={updateTaskCSS.headerText}>
            Update Date for {task.todo}
          </h3>
          <button className={updateTaskCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={updateTaskCSS.columnForm} onSubmit={handleUpdateDate}>
          <div className={updateTaskCSS.upperForm}>
            <label className={updateTaskCSS.colInput}>
              <h3>Current Due Date</h3>
              <p>{task.due}</p>
            </label>
            <label className={updateTaskCSS.colInput}>
              <h3>Due Date</h3>
              <input type="date" placeholder="2023"></input>
            </label>
          </div>
          <div className={updateTaskCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${updateTaskCSS.cancelButton} ${updateTaskCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${updateTaskCSS.createButton} ${updateTaskCSS.button}`}
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

export default UpdateTaskDate;
