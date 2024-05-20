import React, { useContext, useEffect, useState } from "react";
import updateTaskCSS from "./updateTask.module.css";
import { TodoContext } from "../../contexts/TodoContext";
import toast from "react-hot-toast";
import Colours, {
  colours,
  getKeyByValue,
} from "../../features/colourSwatch/components/colourWheel/colours";

function UpdateTask(props) {
  const { changeTodo } = useContext(TodoContext);
  const isUpdatingTodo = props.isUpdatingTodo;
  const setIsUpdatingTodo = props.setIsUpdatingTodo;
  const [selectedColour, setSelectedColour] = useState("Default");
  const task = props.task;
  const column = props.column;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingTodo(!isUpdatingTodo);
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    let newTodo = e.target[0].value;
    if (newTodo === "") {
      newTodo = task.todo;
    }
    if (newTodo.length > 256) {
      toast.error("Todo has to be less than 256 characters long");
      return;
    }
    changeTodo(column, task.id, newTodo, selectedColour);
    handleClose(e);
    console.log(newTodo);
  };
  const currColour = getKeyByValue(colours, props.colour);
  useEffect(() => {
    if (!currColour) {
      setSelectedColour(props.colour);
    } else {
      setSelectedColour(currColour);
    }
  }, []);
  return (
    <div className={updateTaskCSS.popup}>
      <div
        className={updateTaskCSS.popupInner}
        style={{
          borderWidth: "0.2rem",
          borderStyle: "solid",
          borderColor: props.colour,
        }}
      >
        <div className={updateTaskCSS.popupHeader}>
          <h3 className={updateTaskCSS.headerText}>Update Task Name</h3>
          <button className={updateTaskCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form className={updateTaskCSS.columnForm} onSubmit={handleUpdateTodo}>
          <div className={updateTaskCSS.upperForm}>
            <label className={updateTaskCSS.colInput}>
              <h3>Current Todo</h3>
              <div className={updateTaskCSS.todoBox}>{task.todo}</div>
            </label>
            <label className={updateTaskCSS.colInput}>
              <h3>New Todo</h3>
              <input type="input" placeholder={task.todo}></input>
            </label>
            <label className={updateTaskCSS.colInput}>
              <h3>Column Colour</h3>
              <div className={updateTaskCSS.currColour}>
                {selectedColour ? selectedColour.replace("_", " ") : <></>}
              </div>
              <Colours colour={selectedColour} setColour={setSelectedColour} />
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
