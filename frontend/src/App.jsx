import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Board from "./components/test-dnd/Board";
import LoginContainer from "./components/Login/LoginContainer";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwt_auth");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token.accessToken);
      const data = decoded.data;
      console.log(data.user);
      setUser(data.user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className={AppCSS.main}>
      <Header />

      {isLoggedIn ? (
        <div className={AppCSS.container}>
          <Board user={user} />
        </div>
      ) : (
        <>
          <LoginContainer
            setUser={setUser}
            setIsLoggedIn={setIsLoggedIn}
            cookies={cookies}
          />
        </>
      )}
    </div>
  );
}

export default App;
