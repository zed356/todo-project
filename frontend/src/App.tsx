import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CompletedTodos from "./components/todos/CompletedTodos";
import TodosList from "./components/todos/TodosList";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";

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
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

/*
Why typescript types only work with import, not with require()

"emmet.showExpandedAbbreviation": "never" -> default - once vscode ver hits 1.75.1+; fixed global snippets.

*/
