import React from "react";
import Task from "./Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnCSS from "./Column.module.css";
import styled from "styled-components";
import useSWR from "swr";
import { todoFetcher } from "../../api/Todosapi.jsx";
const Container = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 20rem;
  overflow-y: hidden;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: rgb(235, 236, 240);
  padding: 0.5rem;
  height: 100%;
  border-radius: 6px;
`;
const Title = styled.h3`
  padding: 8px;
  margin: 0;
  border-bottom: solid;
  background-color: dark-grey;
  cursor: text;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit "};
  flex-grow: 1;
  height: 62vh;
  overflow-y: hidden;
`;
const AddTodo = styled.button`
  width: 100%;
  font-weight: 700;
  height: 5vh;
  border-radius: 2rem;
  border: 1px;
  box-shadow: 1px 2px 0px black;
`;

export default function Column(props) {
  const user = props.user;
  const todos = props.todos;
  const handleDeleteColumn = (e) => {
    const currCol = e.target.value;
    const deleteColumn = props.deleteColumn;
    deleteColumn(user, currCol);
    return;
  };
  const handleUpdateColumn = (e) => {
    console.log(e.target.textContent);
    if (e.keyCode === 13) {
      e.preventDefault();
      return;
    }
  };

  const handleAddTodo = (e) => {};
  return (
    <Draggable draggableId={props.column} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div className={ColumnCSS.columnHeader} {...provided.dragHandleProps}>
            <Title
              contentEditable="true"
              onKeyDown={handleUpdateColumn}
              suppressContentEditableWarning="true"
            >
              {props.column}
            </Title>
            <button
              className={ColumnCSS.removeColButton}
              onClick={handleDeleteColumn}
              value={props.column}
            >
              -
            </button>
          </div>
          <div className={ColumnCSS.taskbox}>
            <div>
              <Droppable droppableId={props.column} type="task">
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                  >
                    {todos &&
                      todos.length > 0 &&
                      todos.map((task, index) => {
                        return <Task key={task.id} task={task} index={index} />;
                      })}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </div>
            <div>
              <AddTodo onClick={handleAddTodo}>Add Todo</AddTodo>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
