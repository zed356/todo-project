import useHttp from "hooks/useHttp";
import { useEffect, useState } from "react";
import { logout } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";
import AddTodo from "./AddTodo";

import { TodoType } from "./Todo";
import { setInitialTodoList } from "store/todoListSlice";
import Pagination from "./Pagination";


const TodosList = () => {
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const { sendRequest, isLoading } = useHttp();
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.value);
  const authHeader = useAppSelector((state) => state.auth.authHeader);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  useEffect(() => {
    if (Object.keys(authHeader).length) {
      const helperFn = async () => {
        const resData = await sendRequest({
          url: "http://localhost:8080/todos",
          method: "GET",
          reqAuth: true,
        });
        // resData will only exist if the http request was successful
        if (resData) {
          dispatch(
            setInitialTodoList(
              resData.map((el: TodoType) => {
                return { ...el, id: el._id };
              })
            )
          );
        }
      };
      helperFn();
    } else {
      dispatch(logout());
    }
  }, [sendRequest, authHeader, dispatch]);

  let todoListCheckIfEmpty = (isLoading && <LoadingSpinner />) || (
    <div className="mt-16 animate-bounce">
      <span className="p-2 border-[0.25rem] rounded-[0.25rem] border-sky-600 font-sans">
        Add a todo!
      </span>
    </div>
  );

  // Should if be checking data OR todoList ???
  if (todoList) {
    // Filter todo array to only include non completed todos.
    const tempDataArr = todoList.filter((el: TodoType) => !el.completed);

    // If no incomplete todos, then shows generic 'add todo' msg.
    todoListCheckIfEmpty =
      tempDataArr.length === 0 ? (
        todoListCheckIfEmpty
      ) : (
        // Displays incomplete todos if any
        <ul className="flex mt-12 flex-col justify-center items-center w-[15%]">
          {/* {tempDataArr.map((el: TodoType) => (
            <Todo todo={el} key={el.id} />
          ))} */}
          <Pagination todos={tempDataArr} />
        </ul>
      );
  }

  return (
    <main className="flex flex-col items-center w-auto">
      <h2 className="border-b-2 border-sky-600 my-2 font-sans text-lg">Todos</h2>
      <AddTodo inputError={errorModalHandler} />
      {todoListCheckIfEmpty}
      {showErrorModal.show && (
        <Modal
          close={() => setShowErrorModal({ show: false, error: "" })}
          error={showErrorModal.error}
        />
      )}
    </main>
  );
};

export default TodosList;
