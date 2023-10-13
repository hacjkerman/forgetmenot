import React, { useState, useEffect } from "react";
import { getTodos } from "../../api/Todosapi";
import { getColumns } from "../../api/Columnapi";

export default function Data() {
  const [todoData, setTodoData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const columnReq = await getColumns("dies34");
      setColumnData(columnReq);
      const todoReq = await getTodos("dies34");
      setTodoData([todoReq]);

      return;
    }
    fetchData();
  }, []);

  return <div></div>;
}
