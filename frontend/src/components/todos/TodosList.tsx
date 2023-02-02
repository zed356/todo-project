import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

type TodoType = {
  text: string;
  id: number;
};

const DUMMY_LIST = [
  { text: "tiapa!", id: Math.random() },
  { text: "mau!!", id: Math.random() },
  { text: "wup wup!", id: Math.random() },
];

const TodosList = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  const todoListHandler = (newTodo: TodoType) => {
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
  };

  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((el) => el.id !== id));
  };

  const updateTodoHandler = (updatedTodo: { id: number; text: string }) => {
    setTodoList((prev) => {
      const helperArr = prev;
      const index = prev.findIndex((el) => el.id === updatedTodo.id);
      helperArr[index] = updatedTodo;
      return [...helperArr];
    });
  };

  const checkEmptyList =
    todoList.length === 0 ? (
      <p>Add a Todo bish!</p>
    ) : (
      <ul className={classes["todo-list"]}>
        {todoList.map((el) => (
          <Todo updateTodo={updateTodoHandler} deleteTodo={deleteTodo} todo={el} key={el.id} />
        ))}
      </ul>
    );

  useEffect(() => {
    console.log("fetch todos ran");
    fetch("http://localhost:8080/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setTodoList(data);
        }
      });
  }, []);

  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
      <AddTodo inputError={errorModalHandler} addTodo={todoListHandler} />
      {checkEmptyList}
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
