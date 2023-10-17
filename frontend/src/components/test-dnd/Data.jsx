import React, { useEffect } from "react";
import { getTodos } from "../../api/Todosapi";
import { getColumns } from "../../api/Columnapi";

export default function Data(props) {
  useEffect(() => {
    async function fetchData() {
      const columnReq = await getColumns("dies34");
      const todoReq = await getTodos("dies34");
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
      props.setData(finalCol);
      console.log(finalCol);
      return;
    }
    fetchData();
  }, []);

  return <div></div>;
}
