import React from "react";
import HeaderCSS from "./Header.module.css";
import menuIcon from "./Assets/Hamburger_icon.png";

export default function Header(props) {
  const menu = props.menu;
  const setMenu = props.setMenu;
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={HeaderCSS.main}>
      <h1>Forget me Not</h1>
      {menu ? (
        ""
      ) : (
        <>
          <img
            src={menuIcon}
            alt="Menu Icon"
            className={HeaderCSS.menuIcon}
            onClick={toggleMenu}
          />
        </>
      )}
    </div>
  );
}
