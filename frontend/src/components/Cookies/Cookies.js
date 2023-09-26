import React from "react";
import Login from "./Login/Login.js";
import { CookiesProvider, useCookies } from "react-cookie";
import Main from "../Boar/Board.jsx";
import useSWR from "swr";

const url = "http://localhost:4000/login";
const fetcher = (...args) =>
  fetch(...args, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username: "dies34",
      password: "andrew1",
    }),
  }).then((res) => res.json());
export default function Cookies() {
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    const { data: result, error } = useSWR(url, fetcher);
    if (error) return error;
    setCookie("user", result, { path: "/" });
  }
  return (
    <CookiesProvider>
      <div>
        {cookies.user ? (
          <Main user={cookies.user} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </CookiesProvider>
  );
}
