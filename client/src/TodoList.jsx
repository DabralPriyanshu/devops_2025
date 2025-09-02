import React from "react";

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
