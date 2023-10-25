import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  getColumns,
  storeColumn,
  updateColumn,
  updateColumnOrder,
  removeColumn,
  fetcher,
} from "../../api/Columnapi";

export default function Data(props) {
  const setData = props.setData;

  const { data: columns, error } = useSWR(
    "http://localhost:8080/column",
    fetcher,
    {}
  );
  useEffect(() => {
    if (columns) {
      const finalCol = { columns: [] };
      const cols = columns.columnOrder;
      for (let i = 0; i < cols.length; i++) {
        const todoInCol = columns[cols[i]];

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
  }, [columns]);

  return <div></div>;
}
