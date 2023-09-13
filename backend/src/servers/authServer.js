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
import { createUser } from "../users/createUser.js";
import { removeUser } from "../users/deleteUser.js";
import validator from "email-validator";

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
  console.log(token);
  const isValidUser = await verifyUser(username, token);
  console.log(isValidUser);
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
  const accessToken = await generateAccessToken(username);
  await storeActiveToken(username, accessToken);
  res.json({ accessToken: accessToken });
});

// User Operations
app.post("/createUser", async (req, res) => {
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!validator.validate(email)) {
    return res.status(400).json({ error: "Invalid Email" });
  }
  const userId = await createUser({
    name,
    email,
    username,
    password,
  });
  if (userId === undefined) return res.status(400).json({ error: "Duplicate" });
  res.json(userId);
});

app.get("/validateUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await validateUser(username, password);
  res.json(userId);
});

app.delete("/removeUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  const returnVal = await removeUser(userId);
  res.json(returnVal);
});
app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
