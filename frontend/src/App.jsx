import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "./contexts/UserContext.js";
import Profile from "./components/Profile/Profile.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  let token = cookies.get("jwt_auth");
  useEffect(() => {
    setInterval(() => {
      let token = cookies.get("jwt_auth");
      if (token === undefined) {
        setUser("");
        setIsLoggedIn(false);
      }
    }, 1000);
    if (token !== undefined) {
      const decoded = jwtDecode(token);
      const data = decoded.data;
      setUser(data.user);
      setIsLoggedIn(true);
      return;
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, cookies, token }}>
      <div className={AppCSS.main}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
          <BrowserRouter>
            <Header
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route exact path="/" element={<Navigate to="/login" />}></Route>
              <Route
                exact
                path="/profile"
                element={
                  token ? (
                    <Profile
                      user={user}
                      token={token}
                      setIsLoggedIn={setIsLoggedIn}
                      setUser={setUser}
                    />
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
                  token ? (
                    <div className={AppCSS.container}>
                      <Board />
                    </div>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="*" element={<div>Loading...</div>} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </UserContext.Provider>
  );
}

export default App;
