import React, { useState, useContext } from "react";
import Column from "../Column/Column.jsx";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import NewColumn from "../Column/newColumn.jsx";
import styled from "styled-components";
import useSWR from "swr";
import {
  addColMutation as storeColumn,
  addColOptions,
  delColMutation as removeColumn,
  delColOptions,
  updateColMutation as updateColumn,
  updateColOptions,
  updateColOrderMutation as updateColumnOrder,
  updateColOrderOptions,
} from "../../helpers/columnsMutations.jsx";
import {
  addTodoMutation as storeTodo,
  addTodoOptions,
  delTodoMutation as removeTodo,
  delTodoOptions,
  updateTodoMutation as updateTodo,
  updateTodoOptions,
  updateTodoOrderMutation as updateTodoOrder,
  updateTodoOrderOptions,
  updateTodoEstimateMutation as updateTodoEstimate,
  updateTodoEstimateOptions,
  updateTodoDateMutation as updateTodoDate,
  updateTodoDateOptions,
} from "../../helpers/todosMutations.jsx";
import { getColumns } from "../../api/Columnapi.jsx";
import { updateTodoDone } from "../../api/Todosapi.jsx";
import { Toaster } from "react-hot-toast";

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

  const [isTriggered, setIsTriggered] = useState(false);

  const headers = { username: user, token: token, type: "column" };
  const { data: columns, mutate } = useSWR([headers], getColumns);
  // COLUMN API CALLS
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
      await mutate(
        removeColumn(user, column, newColumns, token),
        delColOptions(column, newColumns)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeColumn = async (column, newColumn) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        updateColumn(user, column, newColumn, newColumns, token),
        updateColOptions(column, newColumn, newColumns)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateColOrder = async (user, srcIndex, destIndex) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        updateColumnOrder(user, srcIndex, destIndex, newColumns, token),
        updateColOrderOptions(srcIndex, destIndex, newColumns)
      );
    } catch (err) {
      console.log(err);
    }
  };
  // TODO API CALLS
  const addTodo = async (user, column, todo, estimate, due) => {
    try {
      const newColumns = { ...columns };
      const newTodo = {
        id: columns.todoIndex.toString(),
        todo,
        estimate,
        due,
        done: false,
      };
      await mutate(
        storeTodo(user, column, todo, estimate, due, token, newColumns),
        addTodoOptions(newTodo, column, newColumns)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (user, column, todo) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        removeTodo(user, column, todo, newColumns, token),
        delTodoOptions(column, todo, newColumns)
      );
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
      await mutate(
        updateTodoOrder(
          user,
          oldColumn,
          newColumn,
          srcIndex,
          destIndex,
          newColumns,
          token
        ),
        updateTodoOrderOptions(
          srcIndex,
          destIndex,
          oldColumn,
          newColumn,
          newColumns
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const changeTodo = async (column, todo, newTodo) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        updateTodo(user, column, todo, newTodo, newColumns, token),
        updateTodoOptions(column, todo, newTodo, newColumns)
      );
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

  const changeTodoEstimate = async (column, todo, newEstimate) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        updateTodoEstimate(user, column, todo, newEstimate, newColumns, token),
        updateTodoEstimateOptions(column, todo, newEstimate, newColumns)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const changeTodoDate = async (column, todo, newDate) => {
    try {
      const newColumns = { ...columns };
      await mutate(
        updateTodoDate(user, column, todo, newDate, newColumns, token),
        updateTodoDateOptions(column, todo, newDate, newColumns)
      );
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
    <>
      <Toaster />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
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
                      changeTodoEstimate={changeTodoEstimate}
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
    </>
  );
}
