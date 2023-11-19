import express from "express";
import "dotenv/config";
import cors from "cors";
import generateAccessToken from "./auth/generateAccessToken.js";
import { storeActiveToken } from "./auth/storeToken.js";
import { removeActiveToken } from "./auth/removeActiveToken.js";
import { verifyUser } from "./auth/verifyUserToken.js";
import { findUserInTokens } from "./auth/findUserInTokens.js";
import { createUser } from "./users/createUser.js";
import { removeUser } from "./users/removeUser.js";
import validator from "email-validator";
import { validateUser } from "./users/validateUser.js";
import { findEmailInUsers } from "./users/findEmailInUsers.js";
import { findUserInUsers } from "./users/findUserInUsers.js";

const app = express();
app.use(cors());
app.use(express.json());

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
  const deleteResponse = await removeActiveToken(token);
  if (deleteResponse) {
    return res.json({ status: "Success" });
  } else if (!deleteResponse) {
    return res.json({ error: "Failed deletion" });
  } else {
    return res.json({ error: "Something is wrong" });
  }
});

app.get("/verifyUser", async (req, res) => {
  const { username, token } = req.body;
  if (username === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const isValidUser = await verifyUser(username, token);
  if (!isValidUser) {
    res.json({ error: "Invalid user or token" });
    return;
  }
  return res.json({ status: "User found" });
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
    res.json({ accessToken: userExists });
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
  const emailIsFound = await findEmailInUsers(email);
  if (emailIsFound) {
    return res.json({ error: "Email already exists" });
  }
  if (username.length < 6 || username.length > 100) {
    return res.json({ error: "Invalid Username" });
  }
  const userIsFound = await findUserInUsers(username);
  if (userIsFound) {
    return res.json({ error: "User already exists" });
  }
  if (password.length < 6 || password.length > 100) {
    return res.json({ error: "Invalid Password" });
  }

  if (!/[A-Z]/.test(password)) {
    return res.json({ error: "Password does not contain uppercase" });
  }
  if (!/\d/.test(password)) {
    return res.json({ error: "Password does not contain number" });
  }

  const userId = await createUser({
    email,
    username,
    password,
  });
  if (userId === undefined) return res.json({ error: "Duplicate User" });
  res.json(userId);
});

app.delete("/removeUser", async (req, res) => {
  const { username, password } = req.body;
  if (username === undefined || password === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await validateUser(username, password);
  if (!userId) {
    return res.json({ error: "Invalid password" });
  }
  const returnVal = await removeUser(userId._id);
  res.json(returnVal);
});

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
