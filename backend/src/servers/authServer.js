import express from "express";
import "dotenv/config";
import generateAccessToken from "../auth/generateAccessToken.js";
import jwt from "jsonwebtoken";
import { storeRefreshToken } from "../auth/storeRefreshToken.js";
import { findUser } from "../users/findUser.js";
import { storeActiveToken } from "../auth/storeToken.js";
import { getAllActiveTokens } from "../auth/getallActiveTokens.js";
import { removeRefreshToken } from "../auth/removeRefreshToken.js";

const { sign, verify } = jwt;
const app = express();
app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.get("/activeTokens", async (req, res) => {
  const activeTokens = await getAllActiveTokens();
  if (activeTokens === undefined) {
    res.json("No active user sessions");
  }
  refreshTokens = activeTokens;
  res.json(refreshTokens);
});

app.delete("/logout", async (req, res) => {
  const { username, password } = req.body;
  const userId = await findUser(username, password);
  await removeRefreshToken(userId);
  res.sendStatus(204);
});
app.post("/login", async (req, res) => {
  // Authenticate User

  const { username, password } = req.body;
  const userId = await findUser(username, password);
  const user = { name: username, password: password };
  const accessToken = await generateAccessToken(user);
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET);
  await storeActiveToken(accessToken);
  await storeRefreshToken(userId, refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
