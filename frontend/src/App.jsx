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

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwt_auth");
  useEffect(() => {
    if (token !== undefined) {
      const decoded = jwtDecode(token.accessToken);
      const data = decoded.data;
      setUser(data.user);
      setIsLoggedIn(true);
      return;
    }

    setUser("");
    setIsLoggedIn(false);
  }, [token]);

  return (
    <div className={AppCSS.main}>
      <Header setMenu={setMenu} menu={menu} />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />}></Route>
          <Route
            path="/login"
            element={
              <LoginForm
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                cookies={cookies}
              />
            }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/board"
            element={
              <div className={AppCSS.container}>
                <Board user={user} token={token} />
              </div>
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
