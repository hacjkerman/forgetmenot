import express from "express";
import "dotenv/config";
import generateAccessToken from "../auth/generateAccessToken.js";
import jwt from "jsonwebtoken";

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

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});
app.post("/login", (req, res) => {
  // Authenticate User

  const username = req.body.username;
  const user = { name: username };
  const token = generateAccessToken(user);
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: token, refreshToken: refreshToken });
});

app.listen(process.env.PORT2, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT2}`);
});
