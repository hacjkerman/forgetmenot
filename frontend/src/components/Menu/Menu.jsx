import React, { useContext } from "react";
import MenuCSS from "./Menu.module.css";
import exitIcon from "./Assets/exit_icon.png";
import { logout } from "../../api/Loginapi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function Menu(props) {
  const menu = props.menu;
  const setMenu = props.setMenu;
  const setIsLoggedIn = props.setIsLoggedIn;
  const setUser = props.setUser;
  const { user, isLoggedIn, cookies } = useContext(UserContext);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    const token = cookies.get("jwt_auth");
    const logoutRes = await logout(user, token);
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
        <h2>Menu</h2>
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
