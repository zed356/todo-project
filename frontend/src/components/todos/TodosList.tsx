import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { setInitialTodoList } from "../../store/todoListSlice";
import { RootState } from "../../store/store";
import { TodoType } from "./Todo";

const TodosList = () => {
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todoList.value);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  const todoListCheckIfEmpty =
    todoList.length === 0 ? (
      (isLoading && <LoadingSpinner />) || (
        <p className={classes["empty-todo-msg"]}>Add a todo bish!</p>
      )
    ) : (
      <ul className={classes["todo-list"]}>
        {todoList.map((el) => !el.completed && <Todo todo={el} key={el.id} />)}
      </ul>
    );

  useEffect(() => {
    console.log("i ran");
    fetch("http://localhost:8080/todos")
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
  }, [dispatch]);

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
