import React from "react";
import Task from "./Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnCSS from "./Column.module.css";
import styled from "styled-components";
import useSWR from "swr";
import { todoFetcher } from "../../api/Todosapi.jsx";
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 350px;
  overflow-y: hidden;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  background-color: rgb(235, 236, 240);
  padding: 4px;
  height: 100vh;
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
  min-height: 350px;
  max-height: 350px;
  overflow-y: scroll;
`;
const AddTodo = styled.button`
  width: 100%;
  font-weight: 700;
  height: 5vh;
  border-radius: 16px;
  border: 1px;
  box-shadow: 1px 2px 0px black;
`;

export default function Column(props) {
  const url = "http://localhost:8080/todo";
  const user = props.user;
  const headers = { username: user, column: props.column };
  const { data: todos, mutate } = useSWR([url, headers], todoFetcher, {
    revalidateOnFocus: false,
  });
  const handleDeleteColumn = (e) => {
    const currCol = e.target.value;
    const deleteColumn = props.deleteColumn;
    const columnOrder = props.columnOrder;
    deleteColumn(user, currCol, columnOrder);
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
          <AddTodo onClick={handleAddTodo}>Add Todo</AddTodo>
        </Container>
      )}
    </Draggable>
  );
}
