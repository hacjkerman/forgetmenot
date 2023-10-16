import "dotenv/config";
import { dbClose, dbConnect } from "../../database/db.js";
import jwt from "jsonwebtoken";

const { verify } = jwt;

export async function verifyToken(token) {
  const db = await dbConnect();
  const collection = db.collection("activeTokens");
  let verif;
  try {
    verif = verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    await dbClose();
    return err;
  }
  const isFound = await collection.findOne({
    $and: [
      { username: verif.data.user },
      { email: verif.data.email },
      { token: token },
    ],
  });
  if (!isFound) {
    await dbClose();
    return false;
  }
  await dbClose();
  return true;
}
