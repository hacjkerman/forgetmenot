import React, { useContext, useEffect, useState } from "react";
import newTaskCSS from "./newTask.module.css";
import toast from "react-hot-toast";
import Colours, {
  colours,
  getKeyByValue,
} from "../../features/colourSwatch/components/colourWheel/colours";
import { TodoContext } from "../../contexts/TodoContext";

function NewTask(props) {
  const { addTodo } = useContext(TodoContext);
  const column = props.column;
  const [selectedColour, setSelectedColour] = useState("Default");
  const handleClose = (e) => {
    e.preventDefault();
    props.setTrigger(!props.trigger);
  };
  const handleAddTodo = async (e) => {
    e.preventDefault();
    const todo = e.target[0].value;
    if (todo.length > 256) {
      toast.error("Todo has to be less than 256 characters long");
      return;
    }
    let estimate = 0;
    if (e.target[1].value.length !== 0) {
      estimate = e.target[1].value;
    }
    let due = e.target[2].value;
    if (due === "") {
      due = 0;
    } else if (due.split("-")[0] > 3000) {
      toast.error("Date is past year 3000");
      return;
    }
    await addTodo(column, todo, estimate, due, selectedColour);
    handleClose(e);
    return;
  };
  const currColour = getKeyByValue(colours, props.colour);
  useEffect(() => {
    if (!currColour) {
      setSelectedColour(props.colour);
    } else {
      setSelectedColour(currColour);
    }
  }, []);
  return props.trigger ? (
    <div className={newTaskCSS.popup}>
      <div
        className={newTaskCSS.popupInner}
        style={{
          borderWidth: "0.2rem",
          borderStyle: "solid",
          borderColor: props.colour,
        }}
      >
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
            <label className={newTaskCSS.colInput}>
              <h3>Column Colour</h3>
              <div className={newTaskCSS.currColour}>
                {selectedColour ? selectedColour.replace("_", " ") : <></>}
              </div>
              <Colours colour={selectedColour} setColour={setSelectedColour} />
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
