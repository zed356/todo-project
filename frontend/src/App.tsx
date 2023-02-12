import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CompletedTodos from "./components/todos/CompletedTodos";
import TodosList from "./components/todos/TodosList";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodosList />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <CompletedTodos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
