import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import CompletedTodos from "./components/todos/CompletedTodos";
import TodosList from "./components/todos/TodosList";
import Login from "./components/user/Login";
import ProtectedRoute from "./components/navigation/ProtectedRoute";
import PageNotFound from "./components/navigation/PageNotFound";
import Register from "./components/user/Register";
import NotLoggedInRoute from "./components/navigation/NotLoggedInRoute";
import Logout from "components/user/Logout";
import useVerify from "hooks/useVerify";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

function App() {
  useVerify();
  const auth = useSelector((state: RootState) => state.auth.isAuth);
  console.log(auth);
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        {["/", "/login"].map((path) => (
          <Route
            path={path}
            element={
              <NotLoggedInRoute>
                <Login />
              </NotLoggedInRoute>
            }
            key={Math.random()}
          />
        ))}
        <Route
          path="/register"
          element={
            <NotLoggedInRoute>
              <Register />
            </NotLoggedInRoute>
          }
        />
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
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
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
