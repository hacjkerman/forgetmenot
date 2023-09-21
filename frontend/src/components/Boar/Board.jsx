import React, { useState } from "react";
import Column from "../Column/Column";
import BoardCSS from "./Board.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import useSWR from "swr";

const url = "http://localhost:8080/getAllTodos";
const fetcher = (...args) =>
  fetch(...args, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username: "dies34",
      sessionId:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUxNzAzNTksImRhdGEiOnsidXNlciI6ImRpZXMzNCIsImVtYWlsIjoiYW5kcmV3d2FuZzEzM0BnbWFpbC5jb20ifSwiaWF0IjoxNjk1MTY2NzU5fQ.svRgy2L6UHHtT5veQpDJ9H7_4QNJi8cRNFJd-KpPiEA",
    }),
  }).then((res) => res.json());
export default function Board(props) {
  const { data: result, error } = useSWR(url, fetcher);
  if (error) return <h1>An error has occurred.</h1>;
  if (!result) return <h1>Loading...</h1>;
  // const data = [
  //   { id: 0, todo: "Be Batman", due: "2023-09-13" },
  //   { id: 1, todo: "Be Superman", due: "2023-10-13" },
  //   { id: 2, todo: "Be Wonderwoman", due: "2023-11-13" },
  // ];
  console.log(result);
  // const data2 = [
  //   { id: 3, todo: "Be Spiderman", due: "2023-09-13" },
  //   { id: 4, todo: "Be Ironman", due: "2023-10-13" },
  //   { id: 5, todo: "Be Captain America", due: "2023-11-13" },
  // ];
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "Habits") {
      // const newTodo = Array.from(todos2);
      // const [draggedItem] = newTodo.splice(result.source.index, 1);
      // newTodo.splice(result.destination.index, 0, draggedItem);
    }
    if (result.destination.droppableId === "Todos") {
      // const newTodo = Array.from(todos);
      // const [draggedItem] = newTodo.splice(result.source.index, 1);
      // newTodo.splice(result.destination.index, 0, draggedItem);
      // setTodos(newTodo);
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={BoardCSS.main}>
        {result.results.map((todo) => (
          <Column data={todo.todos} title={todo.titles} />
        ))}
        <Column title="Todos" />
        <Column title="Habits" />
      </div>
    </DragDropContext>
  );
}
