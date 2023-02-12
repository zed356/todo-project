import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { setInitialTodoList, addTodo, deleteTodo, updateTodo } from "../../store/todoListSlice";
import { RootState } from "../../store/store";

export type TodoType = {
  _id?: string;
  text: string;
  id: string;
  completed: boolean;
  date: Date;
};

const TodosList = () => {
  const [showErrorModal, setShowErrorModal] = useState({ show: false, error: "" });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todoList.value);

  const errorModalHandler = (msg: string) => {
    setShowErrorModal({ show: true, error: msg });
  };

  const addTodoHandler = (newTodo: TodoType) => {
    dispatch(addTodo(newTodo));
  };

  const deleteTodoHandler = async (id: string) => {
    const res = await fetch(`http://localhost:8080/delete/${id}`, { method: "DELETE" });
    res.status === 204 && dispatch(deleteTodo(id));
  };

  const updateTodoHandler = async (updatedTodo: TodoType) => {
    const res = await fetch(`http://localhost:8080/update/${updatedTodo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ text: updatedTodo.text, completed: updatedTodo.completed }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status === 201 && dispatch(updateTodo(updatedTodo));
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
                updateTodo={updateTodoHandler}
                deleteTodo={deleteTodoHandler}
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
  }, [isLoading, dispatch]);

  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
      <AddTodo
        addingTodo={() => {
          setIsLoading(true);
        }}
        inputError={errorModalHandler}
        addTodo={addTodoHandler}
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
