import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default async function generateAccessToken(user) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
}
