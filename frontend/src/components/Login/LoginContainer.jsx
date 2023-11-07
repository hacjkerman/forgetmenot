import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginContainer(props) {
  const [page, setPage] = useState("Login");
  if (page === "Login") {
    return (
      <LoginForm
        setPage={setPage}
        setUser={props.setUser}
        setIsLoggedIn={props.setIsLoggedIn}
        cookies={props.cookies}
      />
    );
  }
  if (page === "Sign Up") {
    return <RegisterForm setPage={setPage} />;
  }
}
