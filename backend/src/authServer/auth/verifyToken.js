import { MongoClient } from "mongodb";
import "dotenv/config";
import jwt from "jsonwebtoken";

const { verify } = jwt;

const client = new MongoClient("mongodb://localhost:27017");

const dbName = "mydb";

export async function verifyToken(token) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("activeTokens");
  let verif;
  try {
    verif = verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return err;
  }
  console.log(verif.data.email);
  const isFound = await collection.findOne({
    $and: [
      { username: verif.data.user },
      { email: verif.data.email },
      { token: token },
    ],
  });
  if (!isFound) {
    return false;
  }
  return true;
}
