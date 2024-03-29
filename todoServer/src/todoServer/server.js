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
import { updateTodoDone } from "./todos/updateTodoDone.js";
import { logger } from "./logger/logger.js";

const app = express();
app.use(cors());
app.use(express.json());

function inputValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.body[inputs[i]] === undefined) {
        logger.log({
          level: "error",
          message: "Missing required fields" + inputs[i],
        });
        return res.json({
          error: "Missing required fields: " + inputs[i],
        });
      }
    }
    return fn(req, res);
  };
}
function getInputsValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      if (req.query[inputs[i]] === undefined) {
        logger.log({
          level: "error",
          message: "Missing required fields" + inputs[i],
        });
        return res.json({ error: "Missing required fields" + inputs[i] });
      }
    }
    return fn(req, res);
  };
}
// Column Request Operations
app.put(
  "/column/Order",
  inputValidator(
    async (req, res) => {
      const { username, srcIndex, destIndex, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      if (srcIndex === destIndex) {
        return;
      }
      const updateResult = await updateColOrder(username, srcIndex, destIndex);
      logger.log({
        level: "info",
        message: "Updated column order",
      });
      return res.json(updateResult);
    },
    ["username", "srcIndex", "destIndex", "token"]
  )
);

app.put(
  "/column",
  inputValidator(
    async (req, res) => {
      const { username, oldColumn, newColumn, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const updateResult = await updateColumn(username, oldColumn, newColumn);
      return res.json(updateResult);
    },
    ["username", "oldColumn", "newColumn", "token"]
  )
);

app.post(
  "/column",
  inputValidator(
    async (req, res) => {
      const { username, column, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const storeResult = await storeColumn(username, column);
      return res.json(storeResult);
    },
    ["username", "column", "token"]
  )
);

app.get(
  "/column",
  getInputsValidator(
    async (req, res) => {
      // CHANGE TO BODY IF BACKEND TESTING
      const { username, token } = req.query;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const foundColumns = await getColumns(username);
      if (foundColumns === null) return res.json({ error: "No columns found" });
      return res.json(foundColumns);
    },
    ["username", "token"]
  )
);

app.get(
  "/column/Order",
  getInputsValidator(
    async (req, res) => {
      // CHANGE TO BODY IF BACKEND TESTING
      const { username, token } = req.query;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const foundColumns = await getColumnOrder(username);
      if (foundColumns === null) return res.json({ error: "No columns found" });
      return res.json(foundColumns);
    },
    ["username", "token"]
  )
);

app.delete(
  "/column",
  inputValidator(
    async (req, res) => {
      const { username, column, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }

      const removeResult = await removeColumn(username, column);
      return res.json(removeResult);
    },
    ["username", "column", "token"]
  )
);
// Todo Request Operations
app.post(
  "/todo",
  inputValidator(
    async (req, res) => {
      const { username, column, todo, dueDate, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const storeResult = await storeTodo(username, column, todo, dueDate);
      return res.json(storeResult);
    },
    ["username", "column", "todo", "dueDate", "token"]
  )
);

app.get(
  "/todo",
  getInputsValidator(
    async (req, res) => {
      // CHANGE TO BODY IF BACKEND TESTING ELSE QUERY
      const { username, column, token } = req.query;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const foundTodos = await getAllTodos(username, column);
      if (!foundTodos) {
        logger.log({
          level: "error",
          message: "No todos found",
        });
        return res.json({ error: "No Todos Found" });
      }
      return res.json(foundTodos);
    },
    ["username", "column", "token"]
  )
);

app.put(
  "/todo",
  inputValidator(
    async (req, res) => {
      const { username, column, todo, newTodo, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        console.log("Invalid authorisation");
        return res.json({ error: "Invalid authorisation" });
      }
      const foundTodos = await getAllTodos(username, column);
      if (!foundTodos) {
        console.log("No Todos Found");
        logger.log({
          level: "error",
          message: "No todos found",
        });
        return res.json({ error: "No Todos Found" });
      }
      console.log("update todo");
      const updatedTodo = await updateTodo(
        username,
        column,
        foundTodos,
        todo,
        newTodo
      );
      if (updatedTodo === null) {
        logger.log({
          level: "error",
          message: "Todo update unsuccessful",
        });
        return res.json({ error: "todo update unsuccessful" });
      }
      return res.json(updatedTodo);
    },
    ["username", "column", "todo", "newTodo", "token"]
  )
);

app.put(
  "/todo/Order",
  inputValidator(
    async (req, res) => {
      const { username, oldColumn, srcIndex, destIndex, newColumn, token } =
        req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      if (
        !validateColumn(username, oldColumn) ||
        !validateColumn(username, newColumn)
      ) {
        logger.log({
          level: "error",
          message: "Column invalid",
        });
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
    },
    ["username", "oldColumn", "srcIndex", "destIndex", "newColumn", "token"]
  )
);

app.put(
  "/todo/Done",
  inputValidator(
    async (req, res) => {
      const { username, column, todo, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const foundTodos = await getAllTodos(username, column);
      if (foundTodos.error) {
        return foundTodos;
      }
      const updatedTodo = await updateTodoDone(
        username,
        column,
        foundTodos,
        todo
      );
      if (updatedTodo === null) {
        logger.log({
          level: "error",
          message: "Todo update unsuccessful",
        });
        return res.json({ error: "todo update unsuccessful" });
      }
      return res.json(updatedTodo);
    },
    ["username", "todo", "column", "token"]
  )
);

app.put(
  "/todo/Date",
  inputValidator(
    async (req, res) => {
      const { username, column, todoId, newDate, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const foundTodos = await getAllTodos(username, column);
      if (!foundTodos) {
        logger.log({
          level: "error",
          message: "No todos found",
        });
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
    },
    ["username", "column", "todoId", "newDate", "token"]
  )
);

app.delete(
  "/todo",
  inputValidator(
    async (req, res) => {
      const { username, column, todoId, token } = req.body;
      // TOO MANY ASYNC CALLS???
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }

      const foundTodos = await getAllTodos(username, column);
      if (!foundTodos) {
        logger.log({
          level: "error",
          message: "No todos found",
        });
        return res.json({ error: "No Todos Found" });
      }
      const removeResult = await removeTodo(
        username,
        column,
        foundTodos,
        todoId
      );
      return res.json(removeResult);
    },
    ["username", "column", "todoId", "token"]
  )
);

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
