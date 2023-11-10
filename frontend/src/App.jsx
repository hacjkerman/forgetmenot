import React, { useEffect, useState } from "react";
import AppCSS from "./App.module.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Board from "./components/test-dnd/Board";
import LoginContainer from "./components/Login/LoginContainer";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("jwt_auth");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token.accessToken);
      const data = decoded.data;
      setUser(data.user);
      setIsLoggedIn(true);
      return;
    }
    setUser("");
    setIsLoggedIn(false);
  }, [token]);
  useEffect(() => {}, [menu]);
  let render;
  if (user === null) {
    render = <div>Loading...</div>;
  }
  if (isLoggedIn && user !== null) {
    render = (
      <div className={AppCSS.container}>
        {" "}
        <Board user={user} token={token} />
      </div>
    );
  } else {
    render = (
      <>
        <LoginContainer
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
          cookies={cookies}
        />
      </>
    );
  }
  return (
    <div className={AppCSS.main}>
      <Header setMenu={setMenu} menu={menu} />
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

      {render}
    </div>
  );
}

export default App;
