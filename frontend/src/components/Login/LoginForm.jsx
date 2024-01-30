import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginCSS from "./Login.module.css";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import { googleLogin, login } from "../../api/Loginapi.jsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const notify = (message) => toast(message);

export default function LoginForm(props) {
  const setUser = props.setUser;
  const setIsLoggedIn = props.setIsLoggedIn;
  const cookies = props.cookies;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (Object.keys(errors).length !== 0) {
      console.log(errors);
      notify(errors);
      return;
    }
    const response = await loginUser(data.username, data.password);
    if (!response) {
      console.log("no response");
      // POP UP FOR LOGGING IN ERRORS
      // MAYBE ADD LOADING SCREEN
      notify("Could not connect to server");
      return;
    } else if (response.error) {
      console.log("response sent an error");
      notify(response.error);
      return;
    } else {
      console.log("response succeeded");
      const now = new Date();
      now.getTime();

      now.setHours(now.getHours() + 1);
      cookies.set("jwt_auth", response, { expires: now });
      setUser(data.username);
      setIsLoggedIn(true);
      navigate("/board");
    }
  };

  const handleGoogleLogin = async (credentials) => {
    console.log(credentials);
    const tokens = await googleLogin(credentials);
    console.log(tokens);
  };

  const loginUser = async (user, password) => {
    try {
      const response = await login(user, password);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
    return;
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    return;
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className={LoginCSS.container}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
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
                {...register("username", { required: true, maxLength: 100 })}
              />
            </div>
            {showPassword ? (
              <div className={LoginCSS.input}>
                <img src={password_icon} alt="" />
                <input
                  type="text"
                  placeholder="Password"
                  id="password"
                  {...register("password", { required: true, maxLength: 100 })}
                />
              </div>
            ) : (
              <div className={LoginCSS.input}>
                <img src={password_icon} alt="" />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  {...register("password", { required: true, maxLength: 100 })}
                />
              </div>
            )}

            <div className={LoginCSS.password_button}>
              <input type="checkbox" onClick={toggleShowPassword} />
              <p>Show Password</p>
            </div>

            <div className={LoginCSS.submit_container}>
              <input type="submit" value="Login" className={LoginCSS.submit} />
              <GoogleLogin
                className={LoginCSS.googleLogin}
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <button className={LoginCSS.register} onClick={handleRegister}>
                Sign Up?
              </button>
            </div>
          </div>
        </GoogleOAuthProvider>
      </form>
    </>
  );
}
