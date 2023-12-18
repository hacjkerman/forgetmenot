import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Board from "./components/Board/Board";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";
import Profile from "./components/Profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwt_auth");
  let newToken;
  if (token != undefined) {
    newToken = token.accessToken;
  }
  useEffect(() => {
    if (token != undefined) {
      const decoded = jwtDecode(newToken);
      const data = decoded.data;
      setUser(data.user);
      setIsLoggedIn(true);
      return;
    }
    setUser("");
    setIsLoggedIn(false);
  }, [isLoggedIn]);

  return (
    <div className={AppCSS.main}>
      <Header setMenu={setMenu} menu={menu} />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />}></Route>

          <Route
            exact
            path="/profile"
            element={
              newToken ? (
                <Profile user={user} token={newToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/board" />
              ) : (
                <LoginForm
                  setUser={setUser}
                  setIsLoggedIn={setIsLoggedIn}
                  cookies={cookies}
                />
              )
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/board"
            element={
              newToken ? (
                <div className={AppCSS.container}>
                  <Board user={user} token={newToken} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<div>Loading...</div>} />
        </Routes>
        {menu ? (
          <Menu
            cookies={cookies}
            setMenu={setMenu}
            menu={menu}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
          />
        ) : (
          ""
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
