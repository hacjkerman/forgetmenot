import React from "react";
import Board from "../Board/Board";
import MainCSS from "./Main.module.css";
import { DragDropContext } from "react-beautiful-dnd";

export default function Main() {
  const data = [{}];
  function onDragEnd(result) {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={MainCSS.main}>
        <Board />
      </div>
    </DragDropContext>
  );
}
