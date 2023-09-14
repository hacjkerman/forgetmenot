import React from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className={AppCSS.main}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
