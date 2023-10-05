import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginContainer() {
  const [page, setPage] = useState("Login");
  if (page === "Login") {
    return <Login setPage={setPage} />;
  }
  if (page === "Sign Up") {
    return <Register setPage={setPage} />;
  }
}
