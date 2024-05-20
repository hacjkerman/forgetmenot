import { dbConnect } from "../../database/db.js";
import findColumn from "./findColumn.js";

export async function removeColumn(user, columnName) {
  const db = await dbConnect();
  const userTodos = db.collection("userTodos");
  const foundUser = await userTodos.findOne({
    username: user,
  });
  if (!foundUser) {
    return { error: "User not found" };
  }
  const colOrder = foundUser.columnOrder;
  const filteredColumns = colOrder.filter((column) => column !== columnName);
  const foundCol = findColumn(foundUser, columnName);
  if (!foundCol) {
    if (colOrder.includes(columnName)) {
      await userTodos.updateOne(
        { username: user },
        { $set: { columnOrder: filteredColumns } }
      );
      return { status: "Removed Column from Order" };
    }
    return { error: "Column not found" };
  }
  await userTodos.updateOne(
    { username: user },
    { $unset: { [columnName]: 1 } }
  );

  await userTodos.updateOne(
    { username: user },
    { $set: { columnOrder: filteredColumns } }
  );

  return { status: "Column removed successfully" };
}
