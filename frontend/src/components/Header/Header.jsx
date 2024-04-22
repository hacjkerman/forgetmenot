import React from "react";
import HeaderCSS from "./Header.module.css";
import menuIcon from "./Assets/Hamburger_icon.png";

export default function Header(props) {
  const menu = props.menu;
  const setMenu = props.setMenu;
  const isLoggedIn = props.isLoggedIn;
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={HeaderCSS.main}>
      <h1>Forget me Not</h1>
      {isLoggedIn ? (
        <>
          <img
            src={menuIcon}
            alt="Menu Icon"
            className={HeaderCSS.menuIcon}
            onClick={toggleMenu}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
