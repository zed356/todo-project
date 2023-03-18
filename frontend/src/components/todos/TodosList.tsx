import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { setInitialTodoList } from "../../store/todoListSlice";

import type { TodoType } from "./Todo";

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
    fetch("http://localhost:8080/todos", {
      headers: authHeader,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          dispatch(
            setInitialTodoList(
              data.map((el: TodoType) => {
                return { ...el, id: el._id };
              })
            )
          );
          setIsLoading(false);
        }
      });
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
