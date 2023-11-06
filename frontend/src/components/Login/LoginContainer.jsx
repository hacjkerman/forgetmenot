import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginContainer() {
  const [page, setPage] = useState("Login");
  if (page === "Login") {
    return <LoginForm setPage={setPage} />;
  }
  if (page === "Sign Up") {
    return <RegisterForm setPage={setPage} />;
  }
}
