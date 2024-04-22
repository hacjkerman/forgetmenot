import React, { useContext, useState } from "react";
import TaskCSS from "../Task.module.css";
import UpdateTaskEstimate from "../updateTaskEstimate";
import Timer from "../Timer/Timer";
import { TodoContext } from "../../../contexts/TodoContext";

function Estimate(props) {
  const { changeTodoEstimate } = useContext(TodoContext);
  const [isUpdatingEstimate, setIsUpdatingEstimate] = useState(false);
  const [isDoingTask, setIsDoingTask] = useState(false);
  const todo = props.task;
  const changeDoingState = () => {
    setIsDoingTask(!isDoingTask);
  };
  const changeUpdateEstimate = () => {
    setIsUpdatingEstimate(!isUpdatingEstimate);
  };
  return (
    <div id={TaskCSS.estimate}>
      Estimate:
      {isUpdatingEstimate ? (
        <UpdateTaskEstimate
          isUpdatingEstimate={isUpdatingEstimate}
          setIsUpdatingEstimate={setIsUpdatingEstimate}
          task={props.task}
          column={props.column}
          changeTodoEstimate={changeTodoEstimate}
        ></UpdateTaskEstimate>
      ) : (
        <div className={TaskCSS.estimateBox}>
          <div
            className={TaskCSS.updateEstimate}
            onClick={changeUpdateEstimate}
          >
            {todo && todo.estimate ? <>{todo.estimate}m </> : <></>}
          </div>
          {isDoingTask ? (
            <Timer
              estimate={todo.estimate}
              setIsDoingTask={setIsDoingTask}
            ></Timer>
          ) : (
            <>
              {todo && todo.estimate ? (
                <button
                  className={TaskCSS.startButton}
                  onClick={changeDoingState}
                >
                  Start
                </button>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Estimate;
