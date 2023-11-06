import React, { useState } from "react";
import AppCSS from "./App.module.css";
import Header from "./components/Header/Header";
import Board from "./components/test-dnd/Board";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";

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
          <LoginForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
          {/* <RegisterForm /> */}
        </>
      )}
    </div>
  );
}

export default App;
