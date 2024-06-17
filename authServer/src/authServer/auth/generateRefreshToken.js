import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default async function generateRefreshToken(user, email) {
  const date = new Date();
  const time = date.setMinutes(date.getMinutes() + 60 * 24 * 365);
  const expiry = Math.floor(time / 1000);
  return {
    expires: expiry,
    accessToken: sign(
      { exp: time, data: { user, email } },
      process.env.REFRESH_TOKEN_SECRET
    ),
  };
}
