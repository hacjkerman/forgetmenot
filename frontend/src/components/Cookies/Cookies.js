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
      sessionId:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUxNzAzNTksImRhdGEiOnsidXNlciI6ImRpZXMzNCIsImVtYWlsIjoiYW5kcmV3d2FuZzEzM0BnbWFpbC5jb20ifSwiaWF0IjoxNjk1MTY2NzU5fQ.svRgy2L6UHHtT5veQpDJ9H7_4QNJi8cRNFJd-KpPiEA",
    }),
  }).then((res) => res.json());
export default function Cookies() {
  const { data: result, error } = useSWR(url, fetcher);
  const [cookies, setCookie] = useCookies(["user"]);
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
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
