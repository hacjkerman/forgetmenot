import React from "react";
import { useForm } from "react-hook-form";
import LoginCSS from "./Login.module.css";
import Login from "./Login";

export default function LoginForm(props) {
  const setUser = props.setUser;
  const setIsLoggedIn = props.setIsLoggedIn;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setUser(data.Username);
    setIsLoggedIn(true);
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={LoginCSS.container}>
      <input
        type="text"
        placeholder="Username"
        {...register("Username", { required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="password"
        {...register("password", { required: true, maxLength: 100 })}
      />

      <input type="submit" />
    </form>
  );
}
