import React from "react";
import Task from "../Task/Task";
import BoardCSS from "./board.module.css";
import { Droppable } from "react-beautiful-dnd";

export default function Board() {
  return (
    <div>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={BoardCSS.container}
            >
              <h1>Title</h1>
              <Task date="2023-09-11" id="1" />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
