import React, { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginContainer(props) {
  const [page, setPage] = useState("Login");
  console.log(page);
  if (page === "Login") {
    return (
      <LoginForm
        setPage={setPage}
        setUser={props.setUser}
        setIsLoggedIn={props.setIsLoggedIn}
      />
    );
  }
  if (page === "Sign Up") {
    return <RegisterForm setPage={setPage} />;
  }
}
