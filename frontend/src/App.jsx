import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import initialData from "./components/test-dnd/initial-data";
import Header from "./components/Header/Header";
import LoginContainer from "./components/Login/LoginContainer";
import Board from "./components/test-dnd/Board";
import storeColumn from "./components/Column/storeColumn";
import removeColumn from "./components/Column/removeColumn";
import updateColumn from "./components/Column/updateColumn";
import LoginForm from "./components/Login/LoginForm";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className={AppCSS.main}>
      <Header />

      {isLoggedIn ? (
        <div className={AppCSS.container}>
          <Board user={user} />
        </div>
      ) : (
        <LoginForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
