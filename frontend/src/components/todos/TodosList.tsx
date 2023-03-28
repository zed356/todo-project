import { useCallback, useEffect, useState } from "react";
import { logout } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setInitialTodoList } from "../../store/todoListSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";
import AddTodo from "./AddTodo";
import type { TodoType } from "./Todo";
import Todo from "./Todo";

const TodosList = () => {
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.value);
  const authHeader = useAppSelector((state) => state.auth.authHeader);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };
  console.log(todoList);
  const todoListCheckIfEmpty =
    todoList.filter((el) => !el.completed).length === 0 ? (
      (isLoading && <LoadingSpinner />) || (
        <div className="mt-16 animate-bounce">
          <span className="p-2 border-[0.25rem] rounded-[0.25rem] border-sky-600 font-sans">
            Add a todo!
          </span>
        </div>
      )
    ) : (
      <ul className="flex mt-12 flex-col justify-center items-center w-[15%]">
        {todoList.map((el) => !el.completed && <Todo todo={el} key={el.id} />)}
      </ul>
    );

  const fetchData = useCallback(async () => {
    const res = await fetch("http://localhost:8080/todos", {
      headers: authHeader,
    });
    if (res.status === 200) {
      const data = await res.json();
      dispatch(
        setInitialTodoList(
          data.map((el: TodoType) => {
            return { ...el, id: el._id };
          })
        )
      );
      setIsLoading(false);
    } else {
      dispatch(logout());
    }
  }, [dispatch, authHeader]);

  useEffect(() => {
    if (Object.keys(authHeader).length) {
      fetchData();
    }
  }, [fetchData, authHeader]);

  return (
    <main className="flex flex-col items-center w-auto">
      <h2 className="border-b-2 border-sky-600 my-2 font-sans text-lg">Todos</h2>
      <AddTodo
        addingTodo={() => {
          setIsLoading(true);
        }}
        inputError={errorModalHandler}
      />
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
