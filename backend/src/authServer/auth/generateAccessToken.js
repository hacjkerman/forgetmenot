import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default async function generateAccessToken(user, email) {
  return sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: { user, email } },
    process.env.ACCESS_TOKEN_SECRET
  );
}
