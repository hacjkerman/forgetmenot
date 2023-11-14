import express from "express";
import "dotenv/config";
import { getAllTodos } from "./todos/getAllTodos.js";
import { removeTodo } from "./todos/removeTodo.js";
import { updateTodo } from "./todos/updateTodo.js";
import { verifyUser } from "./users/verifyUser.js";
import { updateTodoColumn } from "./todos/updateTodoColumn.js";
import { updateTodoDate } from "./todos/updateTodoDate.js";
import { updateColumn } from "./columns/updateColumn.js";
import { storeColumn } from "./columns/storeColumn.js";
import { getColumns } from "./columns/getColumns.js";
import { removeColumn } from "./columns/removeColumn.js";
import { storeTodo } from "./todos/storeTodo.js";
import cors from "cors";
import { validateColumn } from "./columns/validateColumn.js";
import { getColumnOrder } from "./columns/getColumnOrder.js";
import { updateColOrder } from "./columns/updateColOrder.js";

const app = express();
app.use(cors());
app.use(express.json());
// Column Request Operations

app.put("/column/Order", async (req, res) => {
  const { username, srcIndex, destIndex, token } = req.body;
  if (
    username === undefined ||
    srcIndex === undefined ||
    destIndex === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  if (srcIndex === destIndex) {
    return;
  }
  const updateResult = await updateColOrder(username, srcIndex, destIndex);
  return res.json(updateResult);
});
app.put("/column", async (req, res) => {
  const { username, oldColumn, newColumn, token } = req.body;
  if (
    username === undefined ||
    oldColumn === undefined ||
    newColumn === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const updateResult = await updateColumn(username, oldColumn, newColumn);
  return res.json(updateResult);
});

app.post("/column", async (req, res) => {
  const { username, column, token } = req.body;

  if (username === undefined || column === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const storeResult = await storeColumn(username, column);
  return res.json(storeResult);
});

app.get("/column", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING
  const { username, token } = req.query;
  if (username === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundColumns = await getColumns(username);
  if (foundColumns === null) return res.json({ error: "No columns found" });
  return res.json(foundColumns);
});

app.get("/column/Order", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING
  const { username, token } = req.query;
  if (username === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundColumns = await getColumnOrder(username);
  if (foundColumns === null) return res.json({ error: "No columns found" });
  return res.json(foundColumns);
});

app.delete("/column", async (req, res) => {
  const { username, column, token } = req.body;
  if (username === undefined || column === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }

  const removeResult = await removeColumn(username, column);
  return res.json(removeResult);
});
// Todo Request Operations
app.post("/todo", async (req, res) => {
  const { username, column, todo, dueDate, token } = req.body;
  if (!username || !column || !todo || !dueDate || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const storeResult = await storeTodo(username, column, todo, dueDate);
  return res.json(storeResult);
});

app.get("/todo", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING ELSE QUERY
  const { username, column, token } = req.query;
  if (username === undefined || column === undefined || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  res.json(foundTodos);
});

app.put("/todo", async (req, res) => {
  const { username, column, todoId, newTodo, token } = req.body;
  if (
    username === undefined ||
    todoId === undefined ||
    newTodo === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const updatedTodo = await updateTodo(
    username,
    column,
    foundTodos,
    todoId,
    newTodo
  );
  if (updatedTodo === null) {
    return res.json({ error: "todo update unsuccessful" });
  }
  res.json(updatedTodo);
});

app.put("/todo/Order", async (req, res) => {
  const { username, oldColumn, srcIndex, destIndex, newColumn, token } =
    req.body;
  if (
    username === undefined ||
    oldColumn === undefined ||
    srcIndex === undefined ||
    destIndex === undefined ||
    newColumn === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  if (
    !validateColumn(username, oldColumn) ||
    !validateColumn(username, newColumn)
  ) {
    return res.json({ error: "Column invalid" });
  }
  const updatedTodoColumn = await updateTodoColumn(
    username,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn
  );
  return res.json(updatedTodoColumn);
});

app.put("/todo/Date", async (req, res) => {
  const { username, column, todoId, newDate, token } = req.body;
  if (
    username === undefined ||
    column === undefined ||
    todoId === undefined ||
    newDate === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const updatedTodo = await updateTodoDate(
    username,
    column,
    foundTodos,
    todoId,
    newDate
  );
  return res.json(updatedTodo);
});

app.delete("/todo", async (req, res) => {
  const { username, column, todoId, token } = req.body;
  if (
    username === undefined ||
    column === undefined ||
    todoId === undefined ||
    token === undefined
  ) {
    return res.json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }

  const foundTodos = await getAllTodos(username, column);
  if (!foundTodos) {
    return res.json({ error: "No Todos Found" });
  }
  const removeResult = await removeTodo(username, column, foundTodos, todoId);
  return res.json(removeResult);
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
