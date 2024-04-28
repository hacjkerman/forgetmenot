import React, { useState } from "react";
import HeaderCSS from "./Header.module.css";
import menuIcon from "./Assets/Hamburger_icon.png";
import Menu from "../Menu/Menu";
export default function Header(props) {
  const setUser = props.setUser;
  const [menu, setMenu] = useState(false);
  const setIsLoggedIn = props.setIsLoggedIn;
  const isLoggedIn = props.isLoggedIn;
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={HeaderCSS.main}>
      <h1>Forget me Not</h1>
      {isLoggedIn ? (
        <>
          {menu ? (
            <Menu
              setMenu={setMenu}
              menu={menu}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          ) : (
            <img
              src={menuIcon}
              alt="Menu Icon"
              className={HeaderCSS.menuIcon}
              onClick={toggleMenu}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
