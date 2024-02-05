import React, { useState } from "react";
import Task from "../Task/Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnCSS from "./Column.module.css";
import styled from "styled-components";
import NewTask from "../Task/newTask.jsx";
import UpdatingColumn from "./updateColumn.jsx";
const Container = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 20rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgb(235, 236, 240);
  padding: 0.5rem;
  height: 100%;
  border-radius: 6px;
  @media (max-width: 600px) {
    width: 15rem;
  }
`;
const Title = styled.h3`
  padding: 8px;
  margin: 0;
  border-bottom: solid;
  background-color: dark-grey;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit "};
  flex-grow: 1;
  height: 62vh;
  overflow-y: scroll;
  scrollbar-width: thin;
`;
const AddTodo = styled.button`
  width: 100%;
  font-weight: 700;
  height: 5vh;
  border-radius: 2rem;
  border: 1px;
  box-shadow: 1px 1px 0px grey;
  z-index: 10;
  background-color: ghostwhite;
`;

export default function Column(props) {
  const user = props.user;
  const todos = props.todos;
  const addTodo = props.addTodo;
  const deleteTodo = props.deleteTodo;
  const column = props.column;
  const [isTriggered, setIsTriggered] = useState(false);
  const [isUpdatingCol, setIsUpdatingCol] = useState(false);
  const handleDeleteColumn = (e) => {
    const currCol = e.target.value;
    const deleteColumn = props.deleteColumn;
    deleteColumn(user, currCol);
    return;
  };

  const changeUpdateColumn = () => {
    setIsUpdatingCol(!isUpdatingCol);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsTriggered(!isTriggered);
  };
  return (
    <Draggable
      draggableId={column}
      index={props.index}
      isDragDisabled={isUpdatingCol}
    >
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div className={ColumnCSS.columnHeader} {...provided.dragHandleProps}>
            {isUpdatingCol ? (
              <UpdatingColumn
                isUpdatingCol={isUpdatingCol}
                setIsUpdatingCol={setIsUpdatingCol}
                column={props.column}
                changeColumn={props.changeColumn}
              ></UpdatingColumn>
            ) : (
              <Title onClick={changeUpdateColumn}>{column}</Title>
            )}
            <button
              className={ColumnCSS.removeColButton}
              onClick={handleDeleteColumn}
              value={column}
            >
              -
            </button>
          </div>
          <div className={ColumnCSS.taskbox}>
            <div>
              <Droppable droppableId={column} type="task">
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                  >
                    {todos &&
                      todos.length > 0 &&
                      todos.map((task, index) => {
                        return (
                          <Task
                            key={task.id}
                            task={task}
                            index={index}
                            column={column}
                            deleteTodo={deleteTodo}
                            user={user}
                            changeTodoDone={props.changeTodoDone}
                            changeTodo={props.changeTodo}
                            changeTodoDate={props.changeTodoDate}
                          />
                        );
                      })}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </div>
          </div>
          <div>
            {isTriggered ? (
              <NewTask
                trigger={isTriggered}
                setTrigger={setIsTriggered}
                addTodo={addTodo}
                user={user}
                todos={todos}
                column={column}
              ></NewTask>
            ) : (
              <AddTodo onClick={handleClick} value={column}>
                Add Todo
              </AddTodo>
            )}
          </div>
        </Container>
      )}
    </Draggable>
  );
}
