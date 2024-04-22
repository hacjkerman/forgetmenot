import React from "react";
import updateTaskCSS from "./updateTask.module.css";

function UpdateTask(props) {
  const isUpdatingTodo = props.isUpdatingTodo;
  const setIsUpdatingTodo = props.setIsUpdatingTodo;
  const task = props.task;
  const column = props.column;
  const changeTodo = props.changeTodo;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingTodo(!isUpdatingTodo);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    const newTodo = e.target[0].value;
    changeTodo(column, task.id, newTodo);
    handleClose(e);
    console.log(newTodo);
  };
  return (
    <div className={updateTaskCSS.popup}>
      <div className={updateTaskCSS.popupInner}>
        <div className={updateTaskCSS.popupHeader}>
          <h3 className={updateTaskCSS.headerText}>
            Update Task for {task.todo}
          </h3>
          <button className={updateTaskCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={updateTaskCSS.columnForm} onSubmit={handleUpdateTodo}>
          <div className={updateTaskCSS.upperForm}>
            <label className={updateTaskCSS.colInput}>
              <h3>Current Todo</h3>
              <p>{task.todo}</p>
            </label>
            <label className={updateTaskCSS.colInput}>
              <h3>New Todo</h3>
              <input type="input" placeholder={task.todo} required></input>
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
