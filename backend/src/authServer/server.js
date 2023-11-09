import express from "express";
import "dotenv/config";
import cors from "cors";
import generateAccessToken from "./auth/generateAccessToken.js";
import { storeActiveToken } from "./auth/storeToken.js";
import { getAllActiveTokens } from "./auth/getallActiveTokens.js";
import { verifyToken } from "./auth/verifyToken.js";
import { removeActiveToken } from "./auth/removeActiveToken.js";
import { verifyUser } from "./auth/verifyUserToken.js";
import { findUserInTokens } from "./auth/findUserInTokens.js";
import { createUser } from "./users/createUser.js";
import { removeUser } from "./users/removeUser.js";
import validator from "email-validator";
import { validateUser } from "./users/validateUser.js";
import { findUserInUsers } from "./users/findUserInUsers.js";

const app = express();
app.use(cors());
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
    return res.json({ error: "Missing required fields" });
  }
  const isValid = await verifyToken(token.token);
  res.json(isValid);
});

app.delete("/logout", async (req, res) => {
  const { username, token } = req.body;
  if (username === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const isValidUser = await verifyUser(username, token);
  if (!isValidUser) {
    res.json({ error: "Invalid User" });
    return;
  }
  await removeActiveToken(token);
  res.sendStatus(204);
});

app.get("/verifyUser", async (req, res) => {
  const { username, token } = req.body;
  const isValidUser = await verifyUser(username, token);
  if (!isValidUser) {
    res.json({ status: false });
    return;
  }
  res.json(true);
});

app.post("/login", async (req, res) => {
  // Authenticate User
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Check if user exists
  const isFound = await findUserInUsers(username);
  if (!isFound) {
    return res.json({ error: "User not found" });
  }
  const isValid = await validateUser(username, password);
  if (!isValid) {
    return res.json({ error: "Invalid password" });
  }
  // Check if user is already logged in
  const userExists = await findUserInTokens(username);
  if (userExists) {
    res.json({ error: "User is already logged in" });
    return;
  }
  const accessToken = await generateAccessToken(username, isFound.email);
  await storeActiveToken(username, isFound.email, accessToken);
  return res.json({ accessToken: accessToken });
});

// User Operations
app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (username === undefined || password === undefined || email === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  if (!validator.validate(email)) {
    return res.json({ error: "Invalid Email" });
  }
  const userId = await createUser({
    email,
    username,
    password,
  });
  if (userId === undefined) return res.json({ error: "Duplicate User" });
  res.json(userId);
});

app.get("/validateUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const user = await validateUser(username, password);
  res.json(user);
});

app.delete("/removeUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUserInUsers(username, password);
  const returnVal = await removeUser(userId._id);
  res.json(returnVal);
});

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
