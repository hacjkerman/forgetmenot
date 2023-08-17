import express from "express";
import "dotenv/config";
import { storeTodo } from "./storeTodo.js";
import { findTodo } from "./findTodo.js";
import { findAllTodos } from "./getAllTodos.js";
import { removeTodo } from "./removeTodo.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/storeTodo", async (req, res) => {
  const { name, todo, dueDate } = req.body;
  if (!name || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  await storeTodo({ userId: 0, name, todo, dueDate });
  res.json("Successful");
});
app.get("/findTodo", (req, res) => {});
app.get("/getAllTodos", (req, res) => {});
app.put("/updateTodo", (req, res) => {});
app.delete("/removeTodo", (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
