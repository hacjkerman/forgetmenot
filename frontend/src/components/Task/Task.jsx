import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskCSS from "./Task.module.css";

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
  const removeTask = (e) => {
    e.preventDefault();
    deleteTodo(user, column, todo);
    return;
  };
  const changeCompletion = (e) => {
    e.preventDefault();
    console.log("gang");
    console.log(e.target.checked);
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
            <p>{props.task.todo}</p>
            <button className={TaskCSS.removeTaskButton} onClick={removeTask}>
              -
            </button>
          </div>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={changeCompletion}
          ></input>
          <div className={TaskCSS.lowerBox}>
            <p id={TaskCSS.dueDate}>Due Date: {props.task.due}</p>
            <p id={TaskCSS.propId}>#{props.task.id}</p>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
