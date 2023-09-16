import React from "react";
import Task from "../Task/Task";
import BoardCSS from "./board.module.css";
import { Droppable } from "react-beautiful-dnd";

export default function Board(props) {
  return (
    <div>
      <Droppable droppableId={props.title} type="COLUMN" direction="vertical">
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={BoardCSS.container}
            >
              <h1>{props.title}</h1>
              {props.data.map(({ id, todo, due }, index) => (
                <Task key={id} due={due} id={id} todo={todo} index={index} />
              ))}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
