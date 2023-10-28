import React, { useEffect, useState } from "react";
import Column from "./Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardCSS from "./Board.module.css";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import {
  getColumns,
  removeColumn,
  storeColumn,
  todosUrlEndpoint,
  updateColumnOrder,
} from "../../api/Columnapi.jsx";
import getData from "./Data.jsx";
import { removeTodo, storeTodo, updateTodoOrder } from "../../api/Todosapi.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.5rem;
  flex-wrap: nowrap;
  height: 95%;
  padding-right: 5rem;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  padding: 4px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 25px;
  margin-right: 2rem;
`;

export default function Board(props) {
  const user = props.user;
  const [isTriggered, setIsTriggered] = useState(false);
  const headers = { username: user };
  const {
    data: columns,
    error,
    mutate,
  } = useSWR([headers], getColumns, { refreshInterval: 3000 });

  if (columns) {
    console.log(columns);
  }
  const addColumn = async (user, column) => {
    try {
      const newColumns = { ...columns };

      newColumns.columnOrder.push(column);
      mutate(newColumns, false);
      await storeColumn(user, column);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteColumn = async (user, column) => {
    try {
      const newColumns = { ...columns };
      const filteredArray = newColumns.columnOrder.filter(
        (columnName) => columnName !== column
      );
      newColumns.columnOrder = filteredArray;
      mutate(newColumns, false);
      await removeColumn(user, column);
    } catch (err) {
      console.log(err);
    }
  };

  const updateColOrder = async (user, srcIndex, destIndex) => {
    try {
      const newColumns = { ...columns };
      const newColumnOrder = Array.from(newColumns.columnOrder);
      const destItem = newColumnOrder[destIndex];
      newColumnOrder[destIndex] = newColumnOrder[srcIndex];
      newColumnOrder[srcIndex] = destItem;
      newColumns.columnOrder = newColumnOrder;
      mutate(newColumns, false);
      await updateColumnOrder(user, srcIndex, destIndex);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (user, column, todo, due) => {
    try {
      const newColumns = { ...columns };
      const newTodo = { id: columns.todoIndex + 1, todo, due };
      newColumns[column].push(newTodo);
      mutate(newColumns, false);
      await storeTodo(user, column, todo, due);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (user, column, todo) => {
    try {
      const newColumns = { ...columns };
      const filteredColumn = newColumns[column].filter(
        (items) => items.id !== todo.id
      );
      newColumns[column] = filteredColumn;
      mutate(newColumns, false);
      await removeTodo(user, column, todo.id);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoOrder = async (
    user,
    oldColumn,
    srcIndex,
    destIndex,
    newColumn
  ) => {
    try {
      const newColumns = { ...columns };
      const srcItem = newColumns[oldColumn];
      if (oldColumn === newColumn) {
        const temp = srcItem[destIndex];
        srcItem[destIndex] = srcItem[srcIndex];
        srcItem[srcIndex] = temp;
        newColumns[oldColumn] = srcItem;
        mutate(newColumns, false);
        await updateTodoOrder(user, oldColumn, srcIndex, destIndex, oldColumn);
        return;
      }
      const destItem = newColumns[newColumn];
      const temp = srcItem[srcIndex];
      const srcCol = srcItem.filter((item) => item.id !== temp.id);
      destItem.splice(destIndex, 0, temp);
      console.log(destItem);
      console.log(newColumns[newColumn]);
      newColumns[newColumn] = destItem;
      newColumns[oldColumn] = srcCol;
      mutate(newColumns, false);
      await updateTodoOrder(user, oldColumn, srcIndex, destIndex, newColumn);
    } catch (err) {
      console.log(err);
    }
  };
  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      updateColOrder(user, source.index, destination.index);
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;

    changeTodoOrder(user, start, source.index, destination.index, finish);
    return;
    // const newColumnOrder = Array.from(columnOrder);
    // const StartObj = data.columns.find((element) => element.id === start);
    // const StartIndex = data.columns.findIndex(
    //   (element) => element.id === start
    // );
    // const startTasks = StartObj.tasks;
    // const currDest = startTasks[destination.index];
    // const srcItem = startTasks[source.index];
    // if (start === finish) {
    //   startTasks[destination.index] = srcItem;
    //   startTasks[source.index] = currDest;
    //   const newColumn = { ...StartObj, tasks: startTasks };
    //   newColumnOrder[StartIndex] = newColumn;
    //   const newState = {
    //     // columns: newColumnOrder,
    //   };
    //   // setData(newState);
    //   return;
    // }
    // const DestObj = data.columns.find((element) => element.id === finish);
    // const DestIndex = data.columns.findIndex(
    //   (element) => element.id === finish
    // );

    // const newDestTasks = DestObj.tasks;
    // const newStartTasks = startTasks.filter((item) => item !== srcItem);
    // newDestTasks.splice(destination.index, 0, srcItem);

    // const newStartCol = { ...StartObj, tasks: newStartTasks };
    // const newDestCol = { ...DestObj, tasks: newDestTasks };
    // newColumnOrder[StartIndex] = newStartCol;
    // newColumnOrder[DestIndex] = newDestCol;

    // const newState = {
    //   columns: newColumnOrder,
    // };
    // setData(newState);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsTriggered(!isTriggered);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columns &&
              columns.columnOrder.map((column, index) => {
                return (
                  <Column
                    key={column}
                    column={column}
                    index={index}
                    user={user}
                    todos={columns[column]}
                    deleteColumn={deleteColumn}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
            {provided.placeholder}

            {isTriggered ? (
              <NewColumn
                trigger={isTriggered}
                setTrigger={setIsTriggered}
                addColumn={addColumn}
                user={user}
                columnOrder={columns.columnOrder}
              ></NewColumn>
            ) : (
              <Button onClick={handleClick}>+</Button>
            )}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
