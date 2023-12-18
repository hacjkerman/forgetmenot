import React, { useState } from "react";
import profile from "./Assets/profile.png";
import ProfileCSS from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ChangeEmail from "./changeEmail";
import ChangePhone from "./changePhone";
import useSWR from "swr";
import { getProfile } from "../../api/Loginapi";

const notify = (message) => toast(message);

function Profile(props) {
  const navigate = useNavigate();
  const user = props.user;
  const token = props.token;
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const headers = { username: user, token: token };
  const { data: columns, mutate } = useSWR([headers], getProfile);

  const handleEmailChange = (e) => {
    e.preventDefault();
    setIsUpdatingEmail(true);
  };

  const handleNumberChange = (e) => {
    e.preventDefault();
    setIsUpdatingPhone(true);
  };

  return (
    <div className={ProfileCSS.container}>
      <h2>Welcome {user}</h2>
      <div className={ProfileCSS.basic}>
        <h2>Basic info</h2>
        <div className={ProfileCSS.profileContainer}>
          <div>Profile Picture</div>
          <div>Add a profile picture to personalise your account</div>
          <img src={profile} alt="" className={ProfileCSS.profile} />
        </div>

        <div>
          <div>Username</div>
          <div>{user}</div>
        </div>
        <div>
          {isUpdatingEmail ? (
            <ChangeEmail
              user={props.user}
              token={props.token}
              trigger={isUpdatingEmail}
              setTrigger={setIsUpdatingEmail}
            />
          ) : (
            <button type="submit" onClick={handleEmailChange}>
              Change Email
            </button>
          )}
        </div>
        <div>
          {isUpdatingPhone ? (
            <ChangePhone
              user={props.user}
              token={props.token}
              trigger={isUpdatingPhone}
              setTrigger={setIsUpdatingPhone}
            />
          ) : (
            <button type="submit" onClick={handleNumberChange}>
              Change/Add Number
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
