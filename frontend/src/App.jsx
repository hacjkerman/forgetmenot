import React from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className={AppCSS.main}>
      <Header />
      <Board />
    </div>
  );
}

export default App;
