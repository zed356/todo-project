import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation";
import CompletedTodos from "./components/todos/CompletedTodos";
import TodosList from "./components/todos/TodosList";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
