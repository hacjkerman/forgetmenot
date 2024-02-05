import express from "express";
import "dotenv/config";
import { getAllUsers } from "./apis/users/getAllUsers.js";
import { dailyDigest } from "./emailer.js";
import { sms } from "./sms.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.get("/getAllUsers", async (req, res) => {
  const response = await getAllUsers();
  res.json(response);
});

app.get("/dailyDigest", async (req, res) => {
  const response = await dailyDigest();
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
