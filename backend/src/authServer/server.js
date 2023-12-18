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
import { updateEmail } from "./users/updateEmail.js";
import { updatePhone } from "./users/updatePhone.js";
import { getEmail } from "./users/getEmail.js";
import { getPhone } from "./users/getPhone.js";
import { getProfile } from "./users/getProfile.js";

const app = express();
app.use(cors());
app.use(express.json());

function inputValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.body[inputs[i]] === undefined) {
        return res.json({ error: "Missing required fields" });
      }
    }

    return fn(req, res);
  };
}
function getInputsValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.query[inputs[i]] === undefined) {
        return res.json({ error: "Missing required fields" });
      }
    }
    return fn(req, res);
  };
}
app.delete(
  "/logout",
  inputValidator(
    async (req, res) => {
      const { username, token } = req.body;
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
    },
    ["username", "token"]
  )
);

app.get(
  "/verifyUser",
  inputValidator(
    async (req, res) => {
      const { username, token } = req.body;
      const isValidUser = await verifyUser(username, token);
      if (isValidUser === null) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      return res.json({ status: "User found" });
    },
    ["username", "token"]
  )
);

app.post(
  "/login",
  inputValidator(
    async (req, res) => {
      const { username, password } = req.body;
      console.log(req.body);
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
    },
    ["username", "password"]
  )
);

// User Operations
app.post(
  "/register",
  inputValidator(
    async (req, res) => {
      const { email, username, password } = req.body;
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
      if (password.length < 6 || password.length > 100) {
        return res.json({ error: "Invalid Password" });
      }
      const userIsFound = await findUserInUsers(username);
      if (userIsFound) {
        return res.json({ error: "User already exists" });
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
    },
    ["email", "username", "password"]
  )
);

app.delete(
  "/removeUser",
  inputValidator(
    async (req, res) => {
      const { username, password, token } = req.body;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const userId = await validateUser(username, password);
      if (!userId) {
        return res.json({ error: "Invalid password" });
      }
      const returnVal = await removeUser(userId._id);
      res.json(returnVal);
    },
    ["username", "password", "token"]
  )
);

app.get(
  "/userProfile",
  getInputsValidator(
    async (req, res) => {
      const { username, token } = req.query;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getProfile(username);
      res.json(returnVal);
    },
    ["username", "token"]
  )
);

app.get(
  "/email",
  getInputsValidator(
    async (req, res) => {
      const { username, token } = req.query;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getEmail(username);
      res.json(returnVal);
    },
    ["username", "token"]
  )
);

app.put(
  "/updateEmail",
  inputValidator(
    async (req, res) => {
      const { username, email, token } = req.body;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await updateEmail(username, email);
      res.json(returnVal);
    },
    ["username", "email", "token"]
  )
);

app.get(
  "/phone",
  getInputsValidator(
    async (req, res) => {
      const { username, token } = req.query;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getPhone(username);
      res.json(returnVal);
    },
    ["username", "token"]
  )
);

app.put(
  "/updatePhone",
  inputValidator(
    async (req, res) => {
      const { username, phone, token } = req.body;
      const isValidUser = await verifyUser(username, token);
      if (!isValidUser) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await updatePhone(username, phone);
      res.json(returnVal);
    },
    ["username", "phone", "token"]
  )
);

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
