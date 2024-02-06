import React from "react";
import { useForm } from "react-hook-form";
import RegisterCSS from "./Register.module.css";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import person_icon from "./Assets/person.png";
import { signUp } from "../../api/Loginapi.jsx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const notify = (message) => toast(message);

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (Object.keys(errors).length !== 0) {
      notify(errors);
    }
    const response = await registerUser(
      data.username,
      data.email,
      data.password
    );
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
      console.log("register success");
      navigate("/login");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
    return;
  };

  const registerUser = async (user, email, password) => {
    try {
      const response = await signUp(user, email, password);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className={RegisterCSS.container}>
        <div className={RegisterCSS.header}>
          <div className={RegisterCSS.text}>Register</div>
          <div className={RegisterCSS.underline}></div>
        </div>
        <div className={RegisterCSS.inputs}>
          <div className={RegisterCSS.input}>
            <img src={person_icon} alt="" />
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true, maxLength: 100 })}
            />
          </div>
          <div className={RegisterCSS.input}>
            <img src={email_icon} alt="" />
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true, maxLength: 100 })}
            />
          </div>

          <div className={RegisterCSS.input}>
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, maxLength: 100 })}
            />
          </div>
          <div className={RegisterCSS.input}>
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                required: true,
                maxLength: 100,
                validate: (val) => {
                  if (watch("password") !== val) {
                    // POP UP SAYING PASSWORDS DO NOT MATCH
                    return "Your passwords do not match";
                  }
                },
              })}
            />
          </div>
          <div className={RegisterCSS.submit_container}>
            <button className={RegisterCSS.submit} onClick={handleLogin}>
              Login
            </button>
            <input
              type="submit"
              value="Sign Up"
              className={RegisterCSS.submit_gray}
            />
          </div>
        </div>
      </form>
    </>
  );
}
