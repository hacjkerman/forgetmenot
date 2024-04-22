import React from "react";
import newTaskCSS from "./newTask.module.css";

function NewTask(props) {
  const user = props.user;
  const addTodo = props.addTodo;
  const column = props.column;
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todo = e.target[0].value;
    if (todo.length > 256) {
      console.log("Todo has to be less than 256 characters long");
      handleClose(e);
      return;
    }
    const estimate = e.target[1].value;
    const due = e.target[2].value;
    await addTodo(user, column, todo, estimate, due);
    handleClose(e);
    return;
  };

  return props.trigger ? (
    <div className={newTaskCSS.popup}>
      <div className={newTaskCSS.popupInner}>
        <div className={newTaskCSS.popupHeader}>
          <h3 className={newTaskCSS.headerText}>New Task</h3>
          <button className={newTaskCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={newTaskCSS.columnForm} onSubmit={handleAddTodo}>
          <div className={newTaskCSS.upperForm}>
            <label className={newTaskCSS.colInput}>
              <h3>Todo</h3>
              <input type="text" placeholder="Go for a run" required></input>
            </label>
            <label className={newTaskCSS.colInput}>
              <h3>Estimate</h3>
              <input type="number" placeholder="60 (minutes)"></input>
            </label>
            <label className={newTaskCSS.colInput}>
              <h3>Due</h3>
              <input type="date" placeholder="2023"></input>
            </label>
          </div>
          <div className={newTaskCSS.lowerFormButtons}>
            <button
              type="button"
              className={`${newTaskCSS.cancelButton} ${newTaskCSS.button}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${newTaskCSS.createButton} ${newTaskCSS.button}`}
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

export default NewTask;
