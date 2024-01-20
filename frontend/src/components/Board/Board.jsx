import React, { useState } from "react";
import Column from "../Column/Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import {
  addColMutation as storeColumn,
  addColOptions,
} from "../../helpers/columnsMutations.jsx";
import {
  getColumns,
  removeColumn,
  // storeColumn,
  updateColumn,
  updateColumnOrder,
} from "../../api/Columnapi.jsx";
import {
  removeTodo,
  storeTodo,
  updateTodoOrder,
  updateTodoDone,
  updateTodoDate,
  updateTodo,
} from "../../api/Todosapi.jsx";
import { useNavigate } from "react-router-dom";

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
  display: flex;
  font-size: 200%;
  margin-top: 0.5rem;
`;

export default function Board(props) {
  const user = props.user;
  const token = props.token;
  const navigate = useNavigate();
  const [isTriggered, setIsTriggered] = useState(false);

  const headers = { username: user, token: token, type: "column" };
  const { data: columns, mutate } = useSWR([headers], getColumns);
  const addColumn = async (user, column) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        storeColumn(user, column, token, newColumns),
        addColOptions(column, newColumns)
      );

      // newColumns.columnOrder.push(column);
      // const response = await storeColumn(user, column, token);
      // mutate(newColumns, false);
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

  const changeColumn = async (column, newColumn) => {
    try {
      const newColumns = { ...columns };
      const currCol = newColumns[column];
      newColumns[newColumn] = currCol;
      let colOrder = newColumns.columnOrder;
      const index = colOrder.findIndex((item) => item === column);
      colOrder.splice(index, 1);
      colOrder.splice(index, 0, newColumn);
      mutate(newColumns, false);
      await updateColumn(user, column, newColumn, token);
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

  const changeTodo = async (column, todo, newTodo) => {
    try {
      const newColumns = { ...columns };
      const currCol = newColumns[column];
      const item = currCol.find((item) => item.id === todo);
      item.todo = newTodo;
      mutate(newColumns, false);
      await updateTodo(user, column, todo, newTodo, token);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoDone = async (column, todo) => {
    try {
      await updateTodoDone(user, column, todo, token);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodoDate = async (column, todo, newDate) => {
    try {
      const newColumns = { ...columns };
      const currCol = newColumns[column];
      const item = currCol.find((item) => item.id === todo);
      item.due = newDate;
      mutate(newColumns, false);
      await updateTodoDate(user, column, todo, newDate, token);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
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
                    changeColumn={changeColumn}
                    addTodo={addTodo}
                    deleteTodo={deleteTodo}
                    changeTodoDone={changeTodoDone}
                    changeTodo={changeTodo}
                    changeTodoDate={changeTodoDate}
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
