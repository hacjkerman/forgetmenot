import React from "react";
import Task from "../Task/Task";
import "./board.css";

export default function Board() {
  return (
    <div className="main">
      <div>
        <h1>Forget me Not</h1>
      </div>
      <div className="container">
        <h1>Title</h1>
        <Task date="2023-09-11" id="1" />
        <Task date="2023-09-11" id="1" />
      </div>
    </div>
  );
}
