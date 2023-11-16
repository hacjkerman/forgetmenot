import React from "react";
import updateTaskCSS from "./updateTask.module.css";

function UpdateTask(props) {
  const isUpdatingTodo = props.isUpdatingTodo;
  const setIsUpdatingTodo = props.setIsUpdatingTodo;
  const task = props.task;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingTodo(!isUpdatingTodo);
  };

  const handleUpdateDate = () => {};
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
              <input type="date" placeholder="2023" required></input>
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

export default UpdateTask;
