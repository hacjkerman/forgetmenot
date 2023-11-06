import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import Board from "./components/test-dnd/Board";
import LoginContainer from "./components/Login/LoginContainer";

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
        <>
          <LoginContainer setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </div>
  );
}

export default App;
