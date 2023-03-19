import { useEffect, useState } from "react";
import { logout } from "store/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setInitialTodoList } from "../../store/todoListSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";
import AddTodo from "./AddTodo";
import type { TodoType } from "./Todo";
import Todo from "./Todo";
import classes from "./TodosList.module.css";

const TodosList = () => {
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.value);
  const authHeader = useAppSelector((state) => state.auth.authHeader);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  const todoListCheckIfEmpty =
    todoList.length === 0 ? (
      (isLoading && <LoadingSpinner />) || (
        <div className={classes.bounce}>
          <span className={classes["empty-todo-msg"]}>Add a todo!</span>
        </div>
      )
    ) : (
      <ul className={classes["todo-list"]}>
        {todoList.map((el) => !el.completed && <Todo todo={el} key={el.id} />)}
      </ul>
    );

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [dispatch, authHeader]);

  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
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
