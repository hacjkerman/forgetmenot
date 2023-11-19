import { MongoClient } from "mongodb";
import "dotenv/config";

const client = new MongoClient(process.env.MONGOADDRESS);

const dbName = process.env.MONGODB;

export async function dbConnect() {
  const db = client.db(dbName);
  return db;
}
