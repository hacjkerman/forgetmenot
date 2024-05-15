import React, { useContext, useState } from "react";
import Task from "../Task/Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnCSS from "./Column.module.css";
import styled from "styled-components";
import NewTask from "../Task/newTask.jsx";
import UpdatingColumn from "./updateColumn.jsx";
import { TodoContext } from "../../contexts/TodoContext.js";
import NewColumn from "./newColumn.jsx";
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
  overflow: hidden;
  max-width: 68%;
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
  cursor: pointer;
`;

export default function Column(props) {
  const { deleteColumn, addTodo } = useContext(TodoContext);
  const todos = props.todos;
  const column = props.column;
  const colour = props.colour;
  const [isTriggered, setIsTriggered] = useState(false);
  const [isUpdatingCol, setIsUpdatingCol] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const handleDeleteColumn = (e) => {
    const currCol = e.target.value;
    deleteColumn(currCol);
    return;
  };

  const changeUpdateColumn = () => {
    setIsUpdatingCol(!isUpdatingCol);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsTriggered(!isTriggered);
  };

  const addNew = (e) => {
    e.preventDefault();
    setIsAdding(!isAdding);
  };
  return (
    <Draggable
      draggableId={column}
      index={props.index}
      isDragDisabled={isUpdatingCol || isAdding}
      style={{ backgroundColor: colour }}
    >
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div
            className={ColumnCSS.columnHeader}
            {...provided.dragHandleProps}
            style={{ backgroundColor: colour }}
          >
            {isAdding ? (
              <NewColumn
                isAddingEnd={isAdding}
                setIsAddingEnd={setIsAdding}
                columnOrder={props.columnOrder}
                currCol={props.index}
              ></NewColumn>
            ) : (
              <button className={ColumnCSS.leftButton} onClick={addNew}>
                +
              </button>
            )}
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
