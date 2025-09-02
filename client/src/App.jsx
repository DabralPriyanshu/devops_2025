import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/todos")
      .then((response) => {
        console.log(response);
        setTodos(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>To-Do App</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
