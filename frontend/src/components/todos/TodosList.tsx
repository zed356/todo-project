import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";

export type TodoType = {
  text: string;
  id: string;
  _id?: string;
  completed: boolean;
};

const TodosList = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const [isLoading, setIsLoading] = useState(true);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  const todoListHandler = (newTodo: TodoType) => {
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
  };

  const deleteTodo = (id: string) => {
    setTodoList((prev) => prev.filter((el) => el.id !== id));
  };

  const updateTodoHandler = (updatedTodo: TodoType) => {
    setTodoList((prev) => {
      const helperArr = prev;
      const index = prev.findIndex((el) => el.id === updatedTodo.id);
      helperArr[index] = updatedTodo;
      return [...helperArr];
    });
    fetch(`http://localhost:8080/update/${updatedTodo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ text: updatedTodo.text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const setTodoCompleted = (id: string) => {
    setTodoList((prev) => {
      return prev.map((el) => {
        if (el.id === id) {
          fetch(`http://localhost:8080/complete/${el.id}`, { method: "PATCH" });
          return { ...el, completed: true };
        }
        return el;
      });
    });
  };

  const todoListCheckIfEmpty =
    todoList.length === 0 ? (
      (isLoading && <LoadingSpinner />) || (
        <p className={classes["empty-todo-msg"]}>Add a todo bish!</p>
      )
    ) : (
      <ul className={classes["todo-list"]}>
        {todoList.map(
          (el) =>
            !el.completed && (
              <Todo
                completeTodo={setTodoCompleted}
                updateTodo={updateTodoHandler}
                deleteTodo={deleteTodo}
                todo={el}
                key={el._id}
              />
            )
        )}
      </ul>
    );

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTodoList(
            data.map((el: TodoType) => {
              return { ...el, id: el._id };
            })
          );
          setIsLoading(false);
        }
      });
  }, [isLoading]);

  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
      <AddTodo
        addingTodo={() => {
          setIsLoading(true);
        }}
        inputError={errorModalHandler}
        addTodo={todoListHandler}
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
