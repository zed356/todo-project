import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import CompletedTodos from "./components/todos/CompletedTodos";
import TodosList from "./components/todos/TodosList";
import Login from "./components/login";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodosList />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
