import React from "react";
import Task from "./Task.jsx";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ColumnCSS from "./Column.module.css";
import styled from "styled-components";
import removeColumn from "../Column/removeColumn.jsx";

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
  min-height: 750px;
  max-height: 750px;
  overflow-y: auto;
`;

export default function Column(props) {
  const handleClick = (e) => {
    const currCol = e.target.value;
    removeColumn(currCol);
  };
  const handleUpdateColumn = (e) => {
    console.log(e.target.textContent);
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log("hihi");
      return;
    }
  };
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <div className={ColumnCSS.columnHeader} {...provided.dragHandleProps}>
            <Title
              contentEditable="true"
              onKeyDown={handleUpdateColumn}
              suppressContentEditableWarning="true"
            >
              {props.column.title}
            </Title>
            <button
              className={ColumnCSS.removeColButton}
              onClick={handleClick}
              value={props.column.title}
            >
              -
            </button>
          </div>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => {
                  return <Task key={task.id} task={task} index={index} />;
                })}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}
