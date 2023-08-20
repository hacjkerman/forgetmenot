import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export default function generateAccessToken(user) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}
