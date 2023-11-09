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
import findColumn from "./columns/findColumn.js";

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
  if (updateResult === false) {
    return res.json({ error: "Bad Storage" });
  }
  return res.json({ msg: "Update Successful" });
});
app.put("/column", async (req, res) => {
  const { username, oldColumn, newColumn, token } = req.body;
  if (!username || !oldColumn || !newColumn || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const updateResult = await updateColumn(username, oldColumn, newColumn);
  if (updateResult === false) {
    return res.json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
});

app.post("/column", async (req, res) => {
  const { username, column, token } = req.body;

  if (!username || !column || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const storeResult = await storeColumn(username, column);
  if (storeResult === false) {
    return res.json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
});

app.get("/column", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING
  const { username, token } = req.query;
  if (!username || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundColumns = await getColumns(username);
  if (foundColumns === null) return res.sendStatus(404);
  res.json(foundColumns);
});

app.get("/column/Order", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING
  const { username, token } = req.query;
  if (!username || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }
  const foundColumns = await getColumnOrder(username);
  if (foundColumns === null) return res.sendStatus(404);
  res.json(foundColumns);
});

app.delete("/column", async (req, res) => {
  const { username, column, token } = req.body;
  console.log(username, column);
  if (!username || !column || token === undefined) {
    return res.json({ error: "Missing required fields" });
  }
  // TOO MANY ASYNC CALLS???
  const validUser = await verifyUser(username, token);
  if (!validUser) {
    return res.json({ error: "Invalid authorisation" });
  }

  const removeResult = await removeColumn(username, column);
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json({ msg: "Removed Todo: " + column + ", Successfully." });
  }
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
  if (storeResult === false) {
    return res.json({ error: "Duplicate Storage" });
  }
  return res.json({ msg: "Update Successful" });
});

app.get("/todo", async (req, res) => {
  // CHANGE TO BODY IF BACKEND TESTING ELSE QUERY
  const { username, column, token } = req.query;
  if (!username || !column || token === undefined) {
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

// app.get("/findUser", async (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.json({ error: "Missing required fields" });
//   }
//   const validUser = await findUser(username, password);
//   res.json(validUser);
// });

app.put("/todo", async (req, res) => {
  const { username, column, todoId, newTodo, token } = req.body;
  if (!username || !todoId || !newTodo || token === undefined) {
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
  if (updatedTodo === null) return res.sendStatus(404);
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
  if (updatedTodoColumn === null) return res.sendStatus(404);
  res.json(updatedTodoColumn);
});

app.put("/todo/Column", async (req, res) => {
  const { username, column, todoId, newColumn, token } = req.body;
  if (!username || !column || !todoId || !newColumn || token === undefined) {
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
  const updatedTodo = await updateTodoColumn(
    username,
    column,
    foundTodos,
    todoId,
    newColumn
  );
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
});

app.put("/todo/Date", async (req, res) => {
  const { username, column, todoId, newDate, token } = req.body;
  if (!username || !column || !todoId || !newDate || token === undefined) {
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
  if (updatedTodo === null) return res.sendStatus(404);
  res.json(updatedTodo);
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
  if (removeResult === false) return res.sendStatus(404);
  else {
    res.json(`Removed Todo Num: ${todoId}, Successfully.`);
  }
});

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
