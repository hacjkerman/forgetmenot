import React from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import LoginContainer from "./components/Login/LoginContainer";
// import Board from "./components/Board/Board";

function App() {
  return (
    <div className={AppCSS.main}>
      <Header />
      <LoginContainer />
      {/* <Board /> */}
    </div>
  );
}

export default App;
