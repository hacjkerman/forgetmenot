import React, { useState, useEffect } from "react";
import { getTodos } from "../../api/Todosapi";
import { getColumns } from "../../api/Columnapi";

export default function Data() {
  const [mappedData, setMappedData] = useState();
  useEffect(() => {
    async function fetchData() {
      const columnReq = await getColumns("dies34");
      const todoReq = await getTodos("dies34");
      const finalCol = [];
      for (let i = 0; i < columnReq.length; i++) {
        const todoInCol = todoReq.filter(
          (todo) => todo.column === columnReq[i]
        );
        if (todoInCol.length === 0) {
          continue;
        }
        const columnName = columnReq[i];
        const mappedData = { [columnName]: todoInCol };
        finalCol.push(mappedData);
      }
      setMappedData(finalCol);
      return;
    }
    fetchData();
  }, []);

  return <div></div>;
}
