import React, { useState } from "react";
import Board from "../Board/Board";
import MainCSS from "./Main.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Main() {
  const { data, error } = useSWR("http://localhost:4000/getAllTodos", fetcher);
  if (error) return "An error has occurred.";
  // const data = [
  //   { id: 0, todo: "Be Batman", due: "2023-09-13" },
  //   { id: 1, todo: "Be Superman", due: "2023-10-13" },
  //   { id: 2, todo: "Be Wonderwoman", due: "2023-11-13" },
  // ];
  const data2 = [
    { id: 3, todo: "Be Spiderman", due: "2023-09-13" },
    { id: 4, todo: "Be Ironman", due: "2023-10-13" },
    { id: 5, todo: "Be Captain America", due: "2023-11-13" },
  ];
  const [todos, setTodos] = useState(data);
  const [todos2, setTodos2] = useState(data2);
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "Habits") {
      const newTodo = Array.from(todos2);
      const [draggedItem] = newTodo.splice(result.source.index, 1);
      newTodo.splice(result.destination.index, 0, draggedItem);
      setTodos2(newTodo);
    }
    if (result.destination.droppableId === "Todos") {
      const newTodo = Array.from(todos);
      const [draggedItem] = newTodo.splice(result.source.index, 1);
      newTodo.splice(result.destination.index, 0, draggedItem);
      setTodos(newTodo);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={MainCSS.main}>
        <Board data={todos} title="Todos" />
        <Board data={todos2} title="Habits" />
      </div>
    </DragDropContext>
  );
}
