import React, { useState } from "react";
import profile from "./Assets/profile.png";
import ProfileCSS from "./Profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import ChangeUser from "./changeUser";
import ChangeEmail from "./changeEmail";
import ChangePhone from "./changePhone";
import useSWR from "swr";
import { getProfile } from "../../api/Loginapi";

const notify = (message) => toast(message);

function Profile(props) {
  const user = props.user;
  const token = props.token;
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const headers = { username: user, token: token, type: "profile" };
  const { data: profile, mutate } = useSWR([headers], getProfile);
  console.log(profile);
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

  return (
    <div className={ProfileCSS.container}>
      <h2>Welcome {user}</h2>
      <div className={ProfileCSS.basic}>
        <h2>Basic info</h2>
        {/* <div className={ProfileCSS.profileContainer}>
          <div>Profile Picture</div>
          <div>Add a profile picture to personalise your account</div>
          <img src={profile} alt="" className={ProfileCSS.profile} />
        </div> */}
        <div className={ProfileCSS.changeContainers}>
          <div className={ProfileCSS.changeContainer}>
            <div>User</div>
            {profile ? <div>{profile.username}</div> : <></>}
            {isUpdatingUser ? (
              <ChangeUser
                user={props.user}
                token={props.token}
                trigger={isUpdatingUser}
                setTrigger={setIsUpdatingUser}
              />
            ) : (
              <>
                <button type="submit" onClick={handleUserChange}>
                  Change User
                </button>
              </>
            )}
          </div>
          <div className={ProfileCSS.changeContainer}>
            <div>Email</div>
            {profile ? <div>{profile.email}</div> : <></>}
            {isUpdatingEmail ? (
              <ChangeEmail
                user={props.user}
                token={props.token}
                trigger={isUpdatingEmail}
                setTrigger={setIsUpdatingEmail}
              />
            ) : (
              <>
                <button type="submit" onClick={handleEmailChange}>
                  Change Email
                </button>
              </>
            )}
          </div>
          <div className={ProfileCSS.changeContainer}>
            <div>Phone Number</div>
            {profile ? <div>{profile.number}</div> : <></>}
            {isUpdatingPhone ? (
              <ChangePhone
                user={props.user}
                token={props.token}
                trigger={isUpdatingPhone}
                setTrigger={setIsUpdatingPhone}
              />
            ) : (
              <>
                <button type="submit" onClick={handleNumberChange}>
                  Change/Add Number
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
