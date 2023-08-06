import express from "express";
import "dotenv/config";
import cors from "cors";
import { storeTodo } from "./storeTodo";
import { findTodo } from "./findTodo";
import { findAllTodos } from "./getAllTodos";
import { removeTodo } from "./removeTodo";
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/storeTodo", (req, res) => {
  const { name, todo, dueDate } = req.body;
  if (!name || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newTodo = { id: { userId } };
});
app.get("/findTodo", (req, res) => {});
app.get("/getAllTodos", (req, res) => {});
app.put("/updateTodo", (req, res) => {});
app.delete("/removeTodo", (req, res) => {});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
