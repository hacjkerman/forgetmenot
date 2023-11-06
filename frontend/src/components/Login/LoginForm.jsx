import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginCSS from "./Login.module.css";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

export default function LoginForm(props) {
  const setUser = props.setUser;
  const setIsLoggedIn = props.setIsLoggedIn;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (errors) {
      console.log(errors);
    }
    setUser(data.Username);
    setIsLoggedIn(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={LoginCSS.container}>
      <div className={LoginCSS.header}>
        <div className={LoginCSS.text}>Login</div>
        <div className={LoginCSS.underline}></div>
      </div>
      <div className={LoginCSS.inputs}>
        <div className={LoginCSS.input}>
          <img src={email_icon} alt="" />

          <input
            type="text"
            placeholder="Username"
            {...register("Username", { required: true, maxLength: 100 })}
          />
        </div>
        {showPassword ? (
          <div className={LoginCSS.input}>
            <img src={password_icon} alt="" />
            <input
              type="text"
              placeholder="Password"
              id="password"
              {...register("Password", { required: true, maxLength: 100 })}
            />
          </div>
        ) : (
          <div className={LoginCSS.input}>
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register("Password", { required: true, maxLength: 100 })}
            />
          </div>
        )}

        <div className={LoginCSS.password_button}>
          <input type="checkbox" onClick={toggleShowPassword} />
          <p>Show Password</p>
        </div>

        <div className={LoginCSS.submit_container}>
          <input type="submit" className={LoginCSS.submit} />
          <button className={LoginCSS.register} onClick={handleRegister}>
            Sign Up?
          </button>
        </div>
      </div>
    </form>
  );
}
