import React, { useState } from "react";
import Column from "../Column/Column";
import BoardCSS from "./Board.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import "./index.css";
import useSWR from "swr";
import {
  getTodos,
  storeTodo,
  removeTodo,
  updateTodo,
  todosUrlEndpoint as cacheKey,
} from "../../api/Todos/Todosapi";

export default async function Board(props) {
  const [newTodo, setNewTodo] = useState("");
  const sessionId =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU2OTI3OTksImRhdGEiOnsidXNlciI6ImRpZXMzNCIsImVtYWlsIjoiYW5kcmV3d2FuZzEzM0BnbWFpbC5jb20ifSwiaWF0IjoxNjk1Njg5MTk5fQ.S2nN-8s4p3CncCJduGuy8dNA7UaigTO4tencf0p6WwU";
  const fetcher = await getTodos("dies34", sessionId);
  console.log(fetcher);

  const {
    isLoading,
    error,
    data: todos,
    mutate,
  } = useSWR(cacheKey, fetcher, {
    onSuccess: (data) => data.sort((a, b) => b.id - a.id),
  });
  const storeTodoMutation = async (sessionId, newTodo, dueDate) => {
    try {
      console.log("awefwefweas");
      await storeTodo("dies34", sessionId, newTodo, dueDate);
      mutate();

      toast.success("Success! Added new item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to add the new item.", {
        duration: 1000,
      });
    }
  };

  const updateTodoMutation = async (sessionId, updatedTodo) => {
    try {
      await updateTodo("dies34", sessionId, updatedTodo);
      mutate();

      toast.success("Success! Added new item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to add the new item.", {
        duration: 1000,
      });
    }
  };

  const deleteTodoMutation = async (sessionId, { id }) => {
    try {
      await removeTodo("dies34", sessionId, { id });
      mutate();

      toast.success("Success! Added new item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error("Failed to add the new item.", {
        duration: 1000,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeTodoMutation({
      sessionId: sessionId,
      userId: 1,
      title: newTodo,
      completed: false,
      id: 9999,
    });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() => {
                updateTodoMutation(sessionId, {
                  ...todo,
                  completed: !todo.completed,
                });
              }}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button
            className="trash"
            onClick={() => deleteTodoMutation(sessionId, { id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }
  // DRAG AND DROP FUNCTIONALITY
  // function onDragEnd(result) {
  //   if (!result.destination) {
  //     return;
  //   }
  //   if (result.destination.droppableId === "Habits") {
  //     // const newTodo = Array.from(todos2);
  //     // const [draggedItem] = newTodo.splice(result.source.index, 1);
  //     // newTodo.splice(result.destination.index, 0, draggedItem);
  //   }
  //   if (result.destination.droppableId === "Todos") {
  //     // const newTodo = Array.from(todos);
  //     // const [draggedItem] = newTodo.splice(result.source.index, 1);
  //     // newTodo.splice(result.destination.index, 0, draggedItem);
  //     // setTodos(newTodo);
  //   }
  // }
  return (
    // DRAG AND DROP RENDER
    // <DragDropContext onDragEnd={onDragEnd}>
    //   <div className={BoardCSS.main}>
    //     {result.results.map((todo) => (
    //       <Column data={todo.todos} title={todo.titles} />
    //     ))}
    //     <Column title="Todos" />
    //     <Column title="Habits" />
    //   </div>
    // </DragDropContext>
    <main>
      <Toaster toastOptions={{ position: "top-center" }} />
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
}
