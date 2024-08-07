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
import { updateTodoEstimate } from "./todos/updateTodoEstimate.js";
import { updateTodoDone } from "./todos/updateTodoDone.js";
import { logger } from "./logger/logger.js";
import { inputValidator, getInputsValidator } from "./inputVals.js";
import { fixer } from "./fixer/fixer.js";

const app = express();
app.use(cors());
app.use(express.json());
// fixer();
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
      const { username, oldColumn, colour, newColumn, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }

      const updateResult = await updateColumn(
        username,
        oldColumn,
        colour,
        newColumn
      );
      return res.json(updateResult);
    },
    ["username", "oldColumn", "colour", "newColumn", "token"]
  )
);

app.post(
  "/column",
  inputValidator(
    async (req, res) => {
      const { username, column, colour, currCol, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      const storeResult = await storeColumn(username, column, colour, currCol);
      return res.json(storeResult);
    },
    ["username", "column", "colour", "currCol", "token"]
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
      console.log(removeResult);
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
      const { username, column, todo, estimate, dueDate, colour, token } =
        req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      console.log(column, todo, estimate, dueDate, colour);
      const storeResult = await storeTodo(
        username,
        column,
        todo,
        estimate,
        dueDate,
        colour
      );
      return res.json(storeResult);
    },
    ["username", "column", "todo", "dueDate", "colour", "token"]
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
      const { username, column, todo, newTodo, newColour, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        console.log("Invalid authorisation");
        return res.json({ error: "Invalid authorisation" });
      }
      // const foundTodos = await getAllTodos(username, column);
      // if (!foundTodos) {
      //   console.log("No Todos Found");
      //   logger.log({
      //     level: "error",
      //     message: "No todos found",
      //   });
      //   return res.json({ error: "No Todos Found" });
      // }
      console.log("update todo");
      const updatedTodo = await updateTodo(
        username,
        column,
        todo,
        newTodo,
        newColour
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
    ["username", "column", "todo", "newTodo", "newColour", "token"]
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
      // const foundTodos = await getAllTodos(username, column);
      // if (foundTodos.error) {
      //   return foundTodos;
      // }
      const updatedTodo = await updateTodoDone(username, column, todo);
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
  "/todo/Estimate",
  inputValidator(
    async (req, res) => {
      const { username, column, todoId, newEstimate, token } = req.body;
      const validUser = await verifyUser(username, token);
      if (validUser.error) {
        logger.log({
          level: "error",
          message: "Invalid authorisation",
        });
        return res.json({ error: "Invalid authorisation" });
      }
      // const foundTodos = await getAllTodos(username, column);
      // if (!foundTodos) {
      //   logger.log({
      //     level: "error",
      //     message: "No todos found",
      //   });
      //   return res.json({ error: "No Todos Found" });
      // }
      const updatedTodo = await updateTodoEstimate(
        username,
        column,
        todoId,
        newEstimate
      );
      return res.json(updatedTodo);
    },
    ["username", "column", "todoId", "newEstimate", "token"]
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
      // const foundTodos = await getAllTodos(username, column);
      // if (!foundTodos) {
      //   logger.log({
      //     level: "error",
      //     message: "No todos found",
      //   });
      //   return res.json({ error: "No Todos Found" });
      // }
      const updatedTodo = await updateTodoDate(
        username,
        column,
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
      // const foundTodos = await getAllTodos(username, column);
      // if (!foundTodos) {
      //   logger.log({
      //     level: "error",
      //     message: "No todos found",
      //   });
      //   return res.json({ error: "No Todos Found" });
      // }
      const removeResult = await removeTodo(username, column, todoId);
      return res.json(removeResult);
    },
    ["username", "column", "todoId", "token"]
  )
);

app.listen(process.env.PORT1, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT1}`);
});
