import React, { useContext, useState } from "react";
import HeaderCSS from "./Header.module.css";
import menuIcon from "./Assets/Hamburger_icon.png";
import Menu from "../Menu/Menu";
import { UserContext } from "../../contexts/UserContext";

export default function Header(props) {
  const setUser = props.setUser;
  const [menu, setMenu] = useState(false);
  const setIsLoggedIn = props.setIsLoggedIn;
  const { user, isLoggedIn, cookies } = useContext(UserContext);
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
              cookies={cookies}
              setMenu={setMenu}
              menu={menu}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
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
