import React, { useState } from "react";
import profilePic from "./Assets/profile.png";
import ProfileCSS from "./Profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import ChangeUser from "./changeUser";
import ChangeEmail from "./changeEmail";
import ChangePhone from "./changePhone";
import ChangePassword from "./changePassword";
import useSWR from "swr";
import { getProfile } from "../../api/Loginapi";
import { useNavigate } from "react-router-dom";

const notify = (message) => toast(message);

function Profile(props) {
  const user = props.user;
  const token = props.token;
  const navigate = useNavigate();
  if (token === undefined || user === undefined) {
    navigate("/login");
  }
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const headers = { username: user, token: token, type: "profile" };
  const { data: profile, mutate } = useSWR([headers], getProfile);
  const handleUserChange = (e) => {
    e.preventDefault();
    setIsUpdatingUser(true);
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setIsUpdatingEmail(true);
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setIsUpdatingPhone(true);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
  };

  const changeItems = ["username", "email", "number"];
  const itemConnection = {
    username: {
      state: isUpdatingUser,
      change: handleUserChange,
      function: (
        <ChangeUser
          user={props.user}
          token={props.token}
          trigger={isUpdatingUser}
          setIsLoggedIn={props.setIsLoggedIn}
          setUser={props.setUser}
          setTrigger={setIsUpdatingUser}
        ></ChangeUser>
      ),
    },
    email: {
      state: isUpdatingEmail,
      change: handleEmailChange,
      function: (
        <ChangeEmail
          user={props.user}
          token={props.token}
          trigger={isUpdatingEmail}
          email={profile ? profile.email : null}
          setTrigger={setIsUpdatingEmail}
        ></ChangeEmail>
      ),
    },
    number: {
      state: isUpdatingPhone,
      change: handleNumberChange,
      function: (
        <ChangePhone
          user={props.user}
          token={props.token}
          phone={profile ? profile.phone : null}
          trigger={isUpdatingPhone}
          setTrigger={setIsUpdatingPhone}
        ></ChangePhone>
      ),
    },
    password: {
      state: isUpdatingPassword,
      change: handlePasswordChange,
      function: (
        <ChangePassword
          user={props.user}
          token={props.token}
          trigger={isUpdatingPassword}
          setTrigger={setIsUpdatingPassword}
        ></ChangePassword>
      ),
    },
  };
  return (
    <div className={ProfileCSS.container}>
      <Toaster />
      <div className={ProfileCSS.user}>Welcome {user}</div>
      <div className={ProfileCSS.basic}>
        <h2>Basic info</h2>
        <div className={ProfileCSS.profileContainer}>
          <div>Profile Picture</div>
          <div className={ProfileCSS.innerProfileContainer}>
            <img src={profilePic} alt="" className={ProfileCSS.profilePic} />
            <div>Add a profile picture to personalise your account</div>
          </div>
        </div>
        <div className={ProfileCSS.changeContainers}>
          {changeItems.map((item) => {
            let title = item.charAt(0).toUpperCase() + item.slice(1);
            if (title === "Number") {
              title = "Phone " + title;
            }
            let unavailable = "Unavailable";
            if (item === "password") {
              unavailable = "Hidden";
            }
            return (
              <div className={ProfileCSS.changeContainer} key={item}>
                <div>{title}</div>
                {profile && profile[item] ? (
                  <div>{profile[item]}</div>
                ) : (
                  <>{unavailable}</>
                )}
                {itemConnection[item].state ? (
                  itemConnection[item].function
                ) : (
                  <>
                    <button
                      className={ProfileCSS.changeButton}
                      type="submit"
                      onClick={itemConnection[item].change}
                    >
                      Change {title}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
