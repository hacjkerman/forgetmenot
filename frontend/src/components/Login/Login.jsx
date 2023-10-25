import React, { useState } from "react";
import LoginCSS from "./Login.module.css";
import { useForm } from "react-hook-form";

import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className={LoginCSS.container}>
      <div className={LoginCSS.header}>
        <div className={LoginCSS.text}>Login</div>
        <div className={LoginCSS.underline}></div>
      </div>
      <div className={LoginCSS.inputs}>
        <div className={LoginCSS.input}>
          <img src={email_icon} alt="" />
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
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
      <div className={LoginCSS.forgot_password}>
        Lost Password? <span>Click Here</span>
      </div>

      <div className={LoginCSS.submit_container}>
        <div
          className={LoginCSS.submit}
          onClick={() => {
            props.setPage("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div className={LoginCSS.submit_gray}>Login</div>
      </div>
    </div>
  );
}
