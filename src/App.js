import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todo from "./features/todo";
function App() {
  return (
    <div className="App">
      <div className="todo-container">
        <Todo />
      </div>
    </div>
  );
}

export default App;
