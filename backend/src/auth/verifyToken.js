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
  const verif = verify(
    token,
    "eee202809a069e78601c1bdc7c896fcaccd907afafd5009408042da01084ec16fb8a55ada0fa4f25a3d04226a4c028920ce867c14f647502462d85111c0c3da1"
  );
  console.log(verif);
  const isFound = await collection.findOne({ token: token });
  if (!isFound) {
    return false;
  }
  return true;
}

verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGllczMzIiwicGFzc3dvcmQiOiJhbmRyZXcxIiwiaWF0IjoxNjk0NTIwODM3LCJleHAiOjE2OTQ1MjQ0Mzd9.OMiamLU-k0OKlGmzGgPKhWP2cjGgwlbSvEpd_HEEXao"
);
