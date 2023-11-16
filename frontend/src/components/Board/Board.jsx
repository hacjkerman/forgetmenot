import React, { useState } from "react";
import Column from "../Column/Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import {
  getColumns,
  removeColumn,
  storeColumn,
  updateColumnOrder,
} from "../../api/Columnapi.jsx";
import {
  removeTodo,
  storeTodo,
  updateTodoOrder,
  updateTodoDone,
} from "../../api/Todosapi.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 0.5rem;
  flex-wrap: nowrap;
  width: fit-content;
  height: 95%;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  cursor: pointer;
  font-size: 200%;
  margin-top: 0.5rem;
`;

export default function Board(props) {
  const user = props.user;
  const token = props.token;
  const [isTriggered, setIsTriggered] = useState(false);
  const headers = { username: user, token: token };
  const { data: columns, mutate } = useSWR([headers], getColumns);

  const addColumn = async (user, column) => {
    try {
      const newColumns = { ...columns };

      newColumns.columnOrder.push(column);
      mutate(newColumns, false);
      await storeColumn(user, column, token);
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
      await removeColumn(user, column, token);
    } catch (err) {
      console.log(err);
    }
  };

  const updateColOrder = async (user, srcIndex, destIndex) => {
    try {
      const newColumns = { ...columns };
      const newColumnOrder = Array.from(newColumns.columnOrder);
      const temp = newColumnOrder[srcIndex];
      newColumnOrder.splice(srcIndex, 1);
      newColumnOrder.splice(destIndex, 0, temp);
      newColumns.columnOrder = newColumnOrder;
      mutate(newColumns, false);
      await updateColumnOrder(user, srcIndex, destIndex, token);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (user, column, todo, due) => {
    try {
      const newColumns = { ...columns };
      const newTodo = { id: columns.todoIndex.toString(), todo, due };
      newColumns[column].push(newTodo);
      mutate(newColumns, false);
      await storeTodo(user, column, todo, due, token);
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
      await removeTodo(user, column, todo.id, token);
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
        const temp = srcItem[srcIndex];
        srcItem.splice(srcIndex, 1);
        srcItem.splice(destIndex, 0, temp);
        newColumns[oldColumn] = srcItem;
        mutate(newColumns, false);
        await updateTodoOrder(
          user,
          oldColumn,
          srcIndex,
          destIndex,
          oldColumn,
          token
        );
        return;
      }
      const destItem = newColumns[newColumn];
      const temp = srcItem[srcIndex];
      srcItem.splice(srcIndex, 1);
      destItem.splice(destIndex, 0, temp);
      newColumns[newColumn] = destItem;
      newColumns[oldColumn] = srcItem;
      mutate(newColumns, false);
      await updateTodoOrder(
        user,
        oldColumn,
        srcIndex,
        destIndex,
        newColumn,
        token
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoDone = async (user, column, todo) => {
    try {
      await updateTodoDone(user, column, todo, token);
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
                    className=""
                    key={column}
                    column={column}
                    index={index}
                    user={user}
                    todos={columns[column]}
                    deleteColumn={deleteColumn}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                    changeTodoDone={changeTodoDone}
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
