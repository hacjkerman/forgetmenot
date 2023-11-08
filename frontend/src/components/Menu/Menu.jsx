import React from "react";
import MenuCSS from "./Menu.module.css";
import exitIcon from "./Assets/exit_icon.png";

function Menu(props) {
  const menu = props.menu;
  const setMenu = props.setMenu;
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div className={MenuCSS.main}>
      Menu
      <img
        src={exitIcon}
        alt="Exit Icon"
        className={MenuCSS.exitIcon}
        onClick={toggleMenu}
      />
    </div>
  );
}

export default Menu;
