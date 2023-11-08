import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Board from "./components/test-dnd/Board";
import LoginContainer from "./components/Login/LoginContainer";

function App() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
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
  }, [token]);
  useEffect(() => {
    console.log(menu);
  }, [menu]);
  return (
    <div className={AppCSS.main}>
      <Header setMenu={setMenu} menu={menu} />
      {menu ? <Menu setMenu={setMenu} menu={menu} /> : ""}

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
