import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskCSS from "./Task.module.css";
import UpdateTaskDate from "./updateTaskDate";
import UpdateTask from "./updateTask";
import Estimate from "./Estimate/Estimate";
import { TodoContext } from "../../contexts/TodoContext";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 12px;
  margin-bottom: 8px;
  background-color: white;
  z-index: 100;
  @media (max-width: 600px) {
    font-size: 15px;
    border-radius: 6px;
    margin-bottom: 3px;
  }
`;

export default function Task(props) {
  const { deleteTodo, changeTodoDone } = useContext(TodoContext);
  const column = props.column;
  const todo = props.task;
  const [isDone, setIsDone] = useState(todo.done);
  const [isUpdatingDate, setIsUpdatingDate] = useState(false);
  const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
  const removeTask = (e) => {
    e.preventDefault();
    deleteTodo(column, todo);
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
            <div className={TaskCSS.estimateBox}>
              <Estimate column={props.column} task={props.task} />
              <div></div>
            </div>

            <div id={TaskCSS.dueDate}>
              Due Date:
              {isUpdatingDate ? (
                <UpdateTaskDate
                  isUpdatingDate={isUpdatingDate}
                  setIsUpdatingDate={setIsUpdatingDate}
                  task={props.task}
                  column={props.column}
                ></UpdateTaskDate>
              ) : (
                <div className={TaskCSS.updateDate} onClick={changeUpdateDate}>
                  {props.task.due}
                </div>
              )}
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
