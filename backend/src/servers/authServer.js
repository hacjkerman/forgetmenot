import express from "express";
import "dotenv/config";
import axios from "axios";
import generateAccessToken from "../auth/generateAccessToken.js";
import { storeActiveToken } from "../auth/storeToken.js";
import { getAllActiveTokens } from "../auth/getallActiveTokens.js";
import { verifyToken } from "../auth/verifyToken.js";
import { removeActiveToken } from "../auth/removeActiveToken.js";
import { verifyUser } from "../auth/verifyUser.js";
import { findUser } from "../auth/findUser.js";

const app = express();
app.use(express.json());

app.get("/activeTokens", async (req, res) => {
  const activeTokens = await getAllActiveTokens();
  if (activeTokens === undefined) {
    res.json("No active user sessions");
  }
  res.json(activeTokens);
});

app.get("/verifyToken", async (req, res) => {
  const token = req.body;
  if (!token) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const isValid = await verifyToken(token.token);
  res.json(isValid);
});

app.delete("/logout", async (req, res) => {
  const { token } = req.body;
  await removeActiveToken(token);
  res.sendStatus(204);
});

app.get("/verifyUser", async (req, res) => {
  const { username, token } = req.body;
  const isValidUser = await verifyUser(username, token);
  if (!isValidUser) {
    res.json(false);
    return;
  }
  res.json(true);
});

app.post("/login", async (req, res) => {
  // Authenticate User
  const { username, password } = req.body;

  // Check if user exists
  const isFound = await axios({
    method: "get",
    url: "http://localhost:8080/validateUser",
    data: {
      username: username,
      password: password,
    },
  });
  if (!isFound) {
    res.json({ error: "User not found" });
    return;
  }
  // Check if user is already logged in
  const userExists = await findUser(username);
  if (userExists) {
    res.json({ error: "User is already logged in" });
    return;
  }
  const user = { name: username, password: password };
  const accessToken = await generateAccessToken(user);
  await storeActiveToken(username, accessToken);
  res.json({ accessToken: accessToken });
});

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
