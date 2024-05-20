import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default async function generateAccessToken(user, email) {
  const date = new Date();
  const time = date.setMinutes(date.getMinutes() + 60);
  const expiry = Math.floor(time / 1000);
  console.log(expiry);
  return {
    expires: expiry,
    accessToken: sign(
      { exp: time, data: { user, email } },
      process.env.ACCESS_TOKEN_SECRET
    ),
  };
}
