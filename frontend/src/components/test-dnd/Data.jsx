import React, { useEffect } from "react";
import { getColumns } from "../../api/Columnapi";

export default function Data(props) {
  const setData = props.setData;
  useEffect(() => {
    async function fetchData() {
      const columnReq = await getColumns("dies34");
      const finalCol = { columns: [] };
      const cols = columnReq.columnOrder;
      for (let i = 0; i < cols.length; i++) {
        const todoInCol = columnReq[cols[i]];

        const colId = i + 1;
        const mappedData = {
          id: "column-" + colId,
          title: cols[i],
          tasks: todoInCol,
        };
        finalCol.columns.push(mappedData);
      }
      setData(finalCol);
      return;
    }
    fetchData();
  }, [setData]);

  return <div></div>;
}
