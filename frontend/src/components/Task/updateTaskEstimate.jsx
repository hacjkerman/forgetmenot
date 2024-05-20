import React from "react";
import updateTaskCSS from "./updateTask.module.css";
import toast from "react-hot-toast";
import { colours } from "../../features/colourSwatch/components/colourWheel/colours";

function UpdateTaskEstimate(props) {
  const isUpdatingEstimate = props.isUpdatingEstimate;
  const setIsUpdatingEstimate = props.setIsUpdatingEstimate;
  const task = props.task;
  const column = props.column;
  const changeTodoEstimate = props.changeTodoEstimate;
  const handleClose = (e) => {
    e.preventDefault();
    setIsUpdatingEstimate(!isUpdatingEstimate);
  };

  const handleUpdateEstimate = (e) => {
    e.preventDefault();
    const newEstimate = e.target[0].value;
    if (newEstimate > 10000) {
      toast.error("new estimate exceeds 10000 minutes (7 days)");
      return;
    }
    changeTodoEstimate(column, task.id, newEstimate);
    handleClose(e);
    return;
  };
  return (
    <div className={updateTaskCSS.popup}>
      <div
        className={updateTaskCSS.popupInner}
        style={{
          border: "0.20rem solid",
          borderColor: colours[task.colour]
            ? colours[task.colour]
            : task.colour,
          borderRadius: 10,
        }}
      >
        <div className={updateTaskCSS.popupHeader}>
          <h3 className={updateTaskCSS.headerText}>
            Update Estimate for {task.todo}
          </h3>
          <button className={updateTaskCSS.closeBtn} onClick={handleClose}>
            x
          </button>
        </div>
        <form
          className={updateTaskCSS.columnForm}
          onSubmit={handleUpdateEstimate}
        >
          <div className={updateTaskCSS.upperForm}>
            <label className={updateTaskCSS.colInput}>
              <h3>Current Estimate</h3>
              <p>{task.estimate}</p>
            </label>
            <label className={updateTaskCSS.colInput}>
              <h3>Estimate</h3>
              <input type="number" placeholder="60"></input>
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

export default UpdateTaskEstimate;
