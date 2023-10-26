import React, { useEffect, useState } from "react";
import { getTodos } from "../../api/Todosapi";
import { getColumns } from "../../api/Columnapi";

export default function GetData(user) {
  const [data, setData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const columnReq = await getColumns(user);
      const todoReq = await getTodos(user);
      let taskIdTotal = 1;
      const finalCol = { columns: [] };
      for (let i = 0; i < columnReq.length; i++) {
        const todoInCol = todoReq.filter(
          (todo) => todo.column === columnReq[i]
        );
        if (todoInCol.length === 0) {
          continue;
        }
        for (let j = 0; j < todoInCol.length; j++) {
          todoInCol[j].id = "task-" + taskIdTotal;
          taskIdTotal++;
        }
        const colId = i + 1;
        const mappedData = {
          id: "column-" + colId,
          title: columnReq[i],
          tasks: todoInCol,
        };
        finalCol.columns.push(mappedData);
      }
      console.log(finalCol);
      setData(finalCol);
      return finalCol;
    }
    fetchData();
  }, []);

  return;
}
