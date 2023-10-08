import React from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import LoginContainer from "./components/Login/LoginContainer";
import Board from "./components/test-dnd/Board";

function App() {
  return (
    <div className={AppCSS.main}>
      <Board />
      <Header />
      <LoginContainer />
    </div>
  );
}

export default App;
