import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGOADDRESS);

const dbName = process.env.MONGODB;

export async function dbConnect() {
  await client.connect();

  const db = client.db(dbName);
  return db;
}

export async function dbClose() {
  await client.close();
}

export async function totalDbConnections() {
  await client.currentOp();
}
