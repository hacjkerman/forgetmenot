import React, { useState } from "react";
import LoginCSS from "./Login.module.css";

import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={LoginCSS.container}>
      <div className={LoginCSS.header}>
        <div className={LoginCSS.text}>Register</div>
        <div className={LoginCSS.underline}></div>
      </div>
      <div className={LoginCSS.inputs}>
        <div className={LoginCSS.input}>
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
        </div>

        <div className={LoginCSS.input}>
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className={LoginCSS.input}>
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
      </div>

      <div className={LoginCSS.submit_container}>
        <div className={LoginCSS.submit_gray}>Sign Up</div>
        <div
          className={LoginCSS.submit}
          onClick={() => {
            props.setPage("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}
