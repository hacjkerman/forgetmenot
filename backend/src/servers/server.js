import express from "express";
import "dotenv/config";
import { storeTodo } from "../todos/storeTodo.js";
import { getAllTodos } from "../todos/getAllTodos.js";
import { removeTodo } from "../todos/removeTodo.js";
import { updateTodo } from "../todos/updateTodo.js";
import { findUser } from "../users/findUser.js";
import { validateUser } from "../users/validateUser.js";

const app = express();
app.use(express.json());

// Todo Request Operations
app.post("/storeTodo", async (req, res) => {
  const { username, sessionId, todo, dueDate } = req.body;
  if (!username || !sessionId || !todo || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, sessionId);
  if (!userId) {
    return res.json("Invalid authorisation");
  }
  const foundTodos = await getAllTodos(userId);
  const storeResult = await storeTodo(userId, foundTodos, todo, dueDate);
  if (storeResult === false) {
    return res.status(400).json({ error: "Duplicate Storage" });
  }
  return res.json("Update Successful");
});

app.get("/getAllTodos", async (req, res) => {
  const { username, sessionId } = req.body;
  if (!username || !sessionId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const userId = await validateUser(username, password);
  const foundTodos = await getAllTodos(userId);
  if (foundTodos === null) return res.sendStatus(404);
  res.json(foundTodos);
});

app.get("/findUser", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const userId = await findUser(username, password);
  res.json(userId);
});

app.put("/updateTodo", async (req, res) => {
  const { username, password, todo, newTodo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const userId = await findUser(username, password);
  const foundTodo = await updateTodo(userId, todo, newTodo);
  if (foundTodo === null) return res.sendStatus(404);
  res.json("Hello");
});

app.delete("/removeTodo", async (req, res) => {
  const { username, password, todo } = req.body;
  if (!username || !password || !todo) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const userId = await findUser(username, password);
  const foundTodos = await getAllTodos(userId);
  const removeResult = await removeTodo(userId, foundTodos, todo);
  if (removeResult === null) return res.sendStatus(404);
  res.json(`Removed Todo: ${todo}, Successfully.`);
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
