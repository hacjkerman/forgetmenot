import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskCSS from "./Task.module.css";
import UpdateTaskDate from "./updateTaskDate";
import UpdateTask from "./updateTask";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  paddig: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

export default function Task(props) {
  const deleteTodo = props.deleteTodo;
  const user = props.user;
  const column = props.column;
  const todo = props.task;
  const changeTodoDone = props.changeTodoDone;
  const [isDone, setIsDone] = useState(todo.done);
  const [isUpdatingDate, setIsUpdatingDate] = useState(false);
  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const removeTask = (e) => {
    e.preventDefault();
    deleteTodo(user, column, todo);
    return;
  };
  const changeCompletion = () => {
    setIsDone(!isDone);
    changeTodoDone(user, column, todo.id);
  };
  const changeUpdateDate = () => {
    console.log("Hello");
    setIsUpdatingDate(!isUpdatingDate);
  };

  const changeUpdateTodo = () => {
    console.log("Hello");
    setIsUpdatingTodo(!isUpdatingTodo);
  };
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          <div className={TaskCSS.upperBox}>
            <div>
              {isUpdatingTodo ? (
                <UpdateTask
                  isUpdatingTodo={isUpdatingTodo}
                  setIsUpdatingTodo={setIsUpdatingTodo}
                  task={props.task}
                ></UpdateTask>
              ) : (
                <p className={TaskCSS.todo} onClick={changeUpdateTodo}>
                  {props.task.todo}
                </p>
              )}
            </div>
            <button className={TaskCSS.removeTaskButton} onClick={removeTask}>
              -
            </button>
          </div>
          <input
            type="checkbox"
            checked={isDone}
            onChange={changeCompletion}
            className={TaskCSS.doneBox}
          ></input>
          <div className={TaskCSS.lowerBox}>
            <p id={TaskCSS.dueDate}>
              Due Date:{" "}
              {isUpdatingDate ? (
                <UpdateTaskDate
                  isUpdatingDate={isUpdatingDate}
                  setIsUpdatingDate={setIsUpdatingDate}
                  task={props.task}
                ></UpdateTaskDate>
              ) : (
                <span className={TaskCSS.updateDate} onClick={changeUpdateDate}>
                  {props.task.due}
                </span>
              )}
            </p>

            <p id={TaskCSS.propId}>#{props.task.id}</p>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
