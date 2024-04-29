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
import { logger } from "./logger/logger.js";
import { OAuth2Client } from "google-auth-library";
import { createGoogleUser } from "./users/createGoogleUser.js";
import endpoints from "../prod/endpoints.js";
import changeEnv from "../prod/vercelENV.js";
import redeploy from "../prod/vercelRedeploy.js";
import { updateName } from "./users/updateName.js";

const app = express();
app.use(cors());
app.use(express.json());

const retry = setInterval(() => {
  setTimeout(async () => {
    const tunnels = await endpoints();
    if (Object.keys(tunnels).length !== 0) {
      const res = await changeEnv(tunnels.auth, tunnels.todo);
      if (res.failed.length === 0) {
        setTimeout(() => {}, "10000");
        await redeploy();
      }
      clearInterval(retry);
    }
  });
}, "10000");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENTID,
  process.env.GOOGLE_CLIENTSECRET,
  "postmessage"
);

// logger.log({
//   level: "info",
//   message: tunnels,
// });

function inputValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.body[inputs[i]] === undefined) {
        logger.log({
          level: "error",
          message: "Missing required fields " + inputs[i],
        });
        return res.json({ error: "Missing required fields " + inputs[i] });
      }
    }

    return fn(req, res);
  };
}
function getInputsValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.query[inputs[i]] === undefined) {
        logger.log({
          level: "error",
          message: "Missing required fields " + inputs[i],
        });
        return res.json({ error: "Missing required fields " + inputs[i] });
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
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid User",
        });
        res.json({ error: "Invalid User" });
        return;
      }
      const deleteResponse = await removeActiveToken(token);
      if (deleteResponse) {
        logger.log({
          level: "info",
          message: "sucessful deletion",
        });
        return res.json({ status: "Successful deletion" });
      } else if (!deleteResponse) {
        logger.log({
          level: "error",
          message: "Failed deletion",
        });
        return res.json({ error: "Failed deletion" });
      } else {
        logger.log({
          level: "error",
          message: "Something is wrong",
        });
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
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      logger.log({
        level: "info",
        message: "User found",
      });
      return res.json({ status: "User found" });
    },
    ["username", "token"]
  )
);

app.post(
  "/googleLogin",
  inputValidator(
    async (req, res) => {
      const tokens = await client.getToken(req.body.code);
      const user = await client.verifyIdToken({
        idToken: tokens.tokens.id_token,
        audience: process.env.GOOGLE_CLIENTID,
      });
      const email = user.payload.email;
      const username = user.payload.name;
      const emailIsFound = await findEmailInUsers(email);
      let newName = username;
      if (!emailIsFound) {
        for (let i = 0; i <= 1000; i++) {
          let isFound = await findUserInUsers(newName);
          if (isFound) {
            newName = username + i;
            logger.log({
              level: "info",
              message: "new username" + newName,
            });
            continue;
          } else {
            break;
          }
        }
        // CREATE NEW GOOGLE USER
        const userId = await createGoogleUser({
          email,
          username: newName,
        });
        if (userId === undefined) {
          logger.log({
            level: "error",
            message: "Duplicate User",
          });
          return res.json({ error: "Duplicate User" });
        }
      }
      const userExists = await findUserInTokens(newName);
      if (userExists) {
        logger.log({
          level: "info",
          message: "user already logged in",
        });
        res.json({
          accessToken: userExists.accessToken,
          username: newName,
          expires: userExists.expires,
        });
        return;
      }
      const response = await generateAccessToken(newName, email);
      await storeActiveToken(
        newName,
        email,
        response.accessToken,
        response.expires
      );
      res.json({
        accessToken: response.accessToken,
        username: newName,
        expires: response.expires,
      });
    },
    ["code"]
  )
);

app.post(
  "/login",
  inputValidator(
    async (req, res) => {
      const { username, password } = req.body;
      // Check if user exists
      const isFound = await findUserInUsers(username);
      if (!isFound) {
        logger.log({
          level: "error",
          message: "User not found",
        });
        return res.json({ error: "User not found" });
      }
      const isValid = await validateUser(username, password);
      if (!isValid) {
        logger.log({
          level: "error",
          message: "Invalid password",
        });
        return res.json({ error: "Invalid password" });
      }
      // Check if user is already logged in
      const userExists = await findUserInTokens(username);
      if (userExists) {
        logger.log({
          level: "info",
          message: "user already logged in",
        });
        res.json(userExists);
        return;
      }
      const response = await generateAccessToken(username, isFound.email);
      await storeActiveToken(
        username,
        isFound.email,
        response.accessToken,
        response.expires
      );
      logger.log({
        level: "info",
        message: "generated and stored active token",
      });
      return res.json(response);
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
        logger.log({
          level: "error",
          message: "Invalid Email",
        });
        return res.json({ error: "Invalid Email" });
      }

      const emailIsFound = await findEmailInUsers(email);
      if (emailIsFound) {
        logger.log({
          level: "error",
          message: "Email already exists",
        });
        return res.json({ error: "Email already exists" });
      }
      if (username.length < 6 || username.length > 100) {
        logger.log({
          level: "error",
          message: "Invalid Username",
        });
        return res.json({
          error: "Username has to be between 6 and 100 characters",
        });
      }
      if (password.length < 6 || password.length > 100) {
        logger.log({
          level: "error",
          message: "Invalid Password",
        });
        return res.json({
          error: "Password has to be between 6 and 100 characters",
        });
      }
      const userIsFound = await findUserInUsers(username);
      if (userIsFound) {
        logger.log({
          level: "error",
          message: "User already exists",
        });
        return res.json({ error: "User already exists" });
      }
      if (!/[A-Z]/.test(password)) {
        logger.log({
          level: "error",
          message: "Password does not contain uppercase",
        });
        return res.json({ error: "Password does not contain uppercase" });
      }
      if (!/\d/.test(password)) {
        logger.log({
          level: "error",
          message: "Password does not contain number",
        });
        return res.json({ error: "Password does not contain number" });
      }
      const userId = await createUser({
        email,
        username,
        password,
      });

      if (userId === undefined) {
        logger.log({
          level: "error",
          message: "Duplicate User",
        });
        return res.json({ error: "Duplicate User" });
      }
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
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      const userId = await validateUser(username, password);
      if (!userId) {
        logger.log({
          level: "error",
          message: "Invalid password",
        });
        return res.json({ error: "Invalid password" });
      }
      const returnVal = await removeUser(userId._id);
      logger.log({
        level: "info",
        message: "removed user",
      });
      res.json(returnVal);
    },
    ["username", "password", "token"]
  )
);

app.put(
  "/username",
  inputValidator(
    async (req, res) => {
      const { username, newUsername, token } = req.body;
      const isValidUser = await verifyUser(username, token);
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      if (newUsername.length < 6 || newUsername.length > 100) {
        logger.log({
          level: "error",
          message: "Invalid Username",
        });
        return res.json({
          error: "Username has to be between 6 and 100 characters",
        });
      }
      const userIsFound = await findUserInUsers(newUsername);
      if (!userIsFound) {
        await updateName(username, newUsername);
        return res.json({ status: "Username successfully changed!" });
      } else {
        logger.log({
          level: "error",
          message: "Username is already taken",
        });
        res.json({ error: "Username is already taken" });
        return;
      }
    },
    ["username", "newUsername", "token"]
  )
);

app.get(
  "/userProfile",
  getInputsValidator(
    async (req, res) => {
      const { username, token } = req.query;
      const isValidUser = await verifyUser(username, token);
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getProfile(username);
      logger.log({
        level: "info",
        message: "received profile",
      });
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
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getEmail(username);
      logger.log({
        level: "info",
        message: "Email found",
      });
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
      if (!validator.validate(email)) {
        logger.log({
          level: "error",
          message: "Invalid email",
        });
        return res.json({ error: "Invalid Email" });
      }
      const isValidEmail = await findEmailInUsers(email);
      if (isValidEmail) {
        logger.log({
          level: "error",
          message: "Email is already registered",
        });
        res.json({ error: "Email is already registered" });
        return;
      }
      const isValidUser = await verifyUser(username, token);
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await updateEmail(username, email);
      logger.log({
        level: "info",
        message: "email updated",
      });
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
      if (isValidUser === null) {
        logger.log({
          level: "error",
          message: "Invalid user or token",
        });
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await getPhone(username);
      logger.log({
        level: "info",
        message: "received phone",
      });
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
      if (isValidUser === null) {
        res.json({ error: "Invalid user or token" });
        return;
      }
      const returnVal = await updatePhone(username, phone);
      res.json(returnVal);
    },
    ["username", "phone", "token"]
  )
);

app.listen(process.env.PORT2, async () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
