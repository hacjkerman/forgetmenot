import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import image from "./images.jfif";
import TaskCSS from "./Task.module.css";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  paddig: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

export default function Task(props) {
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
            <img src={image} alt="pfp" id={TaskCSS.pfp} />
            <p>{props.task.todo}</p>
          </div>
          <div className={TaskCSS.lowerBox}>
            <p id={TaskCSS.dueDate}>Due Date: {props.task.due}</p>
            <p id={TaskCSS.propId}>#{props.task.id}</p>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
