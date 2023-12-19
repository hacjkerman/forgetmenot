import React from "react";
import MenuCSS from "./Menu.module.css";
import exitIcon from "./Assets/exit_icon.png";
import { logout } from "../../api/Loginapi";
import { useNavigate } from "react-router-dom";

function Menu(props) {
  const cookies = props.cookies;
  const menu = props.menu;
  const setMenu = props.setMenu;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const user = props.user;
  const setUser = props.setUser;
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    const token = cookies.get("jwt_auth");
    console.log(token.accessToken);
    const logoutRes = await logout(user, token.accessToken);
    if (logoutRes.error) {
      console.log(logoutRes.error);
      return;
    }
    setIsLoggedIn(!isLoggedIn);
    setMenu(!menu);
    setUser("");
    if (cookies.get("jwt_auth") !== undefined) {
      cookies.remove("jwt_auth");
    }
    navigate("/login");
  };

  const handleBoard = () => {
    navigate("/board");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={MenuCSS.main}>
      <div className={MenuCSS.links}>
        <h1>Menu</h1>

        {isLoggedIn ? (
          <>
            <button onClick={handleBoard}>
              <h2>Board</h2>
            </button>
            <button onClick={handleProfile}>
              <h2>Profile</h2>
            </button>
            <button onClick={handleLogout}>
              <h2>Logout</h2>
            </button>
          </>
        ) : (
          <>
            <h1>Nothing here at the moment.</h1>
            <h2>Please log in</h2>
          </>
        )}
      </div>
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
