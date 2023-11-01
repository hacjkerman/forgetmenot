import React from "react";
import { useForm } from "react-hook-form";
import Login from "./Login";

export default function RegisterForm(props) {
  const setUser = props.setUser;
  const setIsLoggedIn = props.setIsLoggedIn;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setUser(data.Username);
    setIsLoggedIn(true);
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First_name"
        {...register("First name", { required: true, maxLength: 80 })}
      />
      <input
        type="text"
        placeholder="Email"
        {...register("Email", { required: true, maxLength: 100 })}
      />
      <input
        type="text"
        placeholder="Username"
        {...register("Username", { required: true, maxLength: 100 })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, maxLength: 100 })}
      />
      <input
        type="password"
        placeholder="confirm_password"
        {...register("confirm_password", {
          required: true,
          maxLength: 100,
          validate: (val) => {
            if (watch("password") != val) {
              return "Your passwords do not match";
            }
          },
        })}
      />

      <input type="submit" />
    </form>
  );
}
