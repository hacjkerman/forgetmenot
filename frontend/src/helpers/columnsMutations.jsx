import {
  storeColumn,
  updateColumn,
  updateColumnOrder,
} from "../api/Columnapi.jsx";

export const addColMutation = async (user, newColumn, token, columns) => {
  const added = await storeColumn(user, newColumn, token);
  if (added.status) {
    columns.columnOrder.push(newColumn);
    columns[newColumn] = [];
    console.log(columns);
    console.log(added.status);
    return columns;
  } else if (added.error) {
    console.log(added.error);
    return added.error;
  } else {
    console.log("failed");
    return;
  }
};

export const addColOptions = (newColumn, columns) => {
  columns.columnOrder.push(newColumn);
  return {
    optimisticData: columns,
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
};
