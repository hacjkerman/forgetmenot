import React from "react";
import image from "./images.jfif";
import "./task.css";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable key="0" draggableId={"0"} index="0">
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
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
            </div>
            <div className="lower-box">
              <p id="dueDate">Due Date: {props.date}</p>
              <p id="propId">#{props.id}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
