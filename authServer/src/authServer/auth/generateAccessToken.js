import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default async function generateAccessToken(user, email) {
  const time = Math.floor(Date.now() / 1000) + 60 * 59;
  return {
    expires: time,
    accessToken: sign(
      { exp: time, data: { user, email } },
      process.env.ACCESS_TOKEN_SECRET
    ),
  };
}
