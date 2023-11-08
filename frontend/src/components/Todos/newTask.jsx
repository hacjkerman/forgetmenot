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
    const due = e.target[1].value;

    await addTodo(user, column, todo, due);
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
              <input type="text" placeholder="Be Batman" required></input>
            </label>
            <label className={newTaskCSS.colInput}>
              <h3>Due</h3>
              <input type="date" placeholder="2023" required></input>
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
