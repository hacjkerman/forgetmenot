import React from "react";
import image from "./images.jfif";
import "./Task.module.css";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable
      key={props.id}
      draggableId={"draggable-" + props.id}
      index={props.index}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className="wrapper"
          >
            <div className="upper-box">
              <img src={image} alt="pfp" id="pfp" />
              <p>{props.todo}</p>
            </div>
            <div className="lower-box">
              <p id="dueDate">Due Date: {props.due}</p>
              <p id="propId">#{props.id}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
