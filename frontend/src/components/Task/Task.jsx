import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskCSS from "./Task.module.css";
import UpdateTaskDate from "./updateTaskDate";
import UpdateTask from "./updateTask";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 12px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  @media (max-width: 600px) {
    border-radius: 6px;
  }
`;

export default function Task(props) {
  const deleteTodo = props.deleteTodo;
  const user = props.user;
  const column = props.column;
  const todo = props.task;
  const changeTodoDone = props.changeTodoDone;
  const changeTodo = props.changeTodo;
  const changeTodoDate = props.changeTodoDate;
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
    changeTodoDone(column, todo.id);
  };
  const changeUpdateDate = () => {
    setIsUpdatingDate(!isUpdatingDate);
  };

  const changeUpdateTodo = () => {
    setIsUpdatingTodo(!isUpdatingTodo);
  };
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      isDragDisabled={isUpdatingDate || isUpdatingTodo}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          <div className={TaskCSS.upperBox}>
            {isUpdatingTodo ? (
              <UpdateTask
                isUpdatingTodo={isUpdatingTodo}
                setIsUpdatingTodo={setIsUpdatingTodo}
                task={props.task}
                column={props.column}
                changeTodo={changeTodo}
              ></UpdateTask>
            ) : (
              <div className={TaskCSS.todo} onClick={changeUpdateTodo}>
                {props.task.todo}
              </div>
            )}
            <button className={TaskCSS.removeTaskButton} onClick={removeTask}>
              -
            </button>
          </div>
          <input
            type="checkbox"
            checked={isDone}
            onChange={changeCompletion}
            className={TaskCSS.doneBox}
            name="doneBox"
          ></input>
          <div className={TaskCSS.lowerBox}>
            <div id={TaskCSS.dueDate}>
              Due Date:{" "}
              {isUpdatingDate ? (
                <UpdateTaskDate
                  isUpdatingDate={isUpdatingDate}
                  setIsUpdatingDate={setIsUpdatingDate}
                  task={props.task}
                  column={props.column}
                  changeTodoDate={changeTodoDate}
                ></UpdateTaskDate>
              ) : (
                <span className={TaskCSS.updateDate} onClick={changeUpdateDate}>
                  {props.task.due}
                </span>
              )}
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
