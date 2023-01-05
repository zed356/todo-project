import Todo from "./Todo";
import AddTodo from "./AddTodo";
import classes from "./TodosList.module.css";
import { useState } from "react";

// const DUMMY_TODOS = [{ text: "dis pls" }, { text: "meow pls" }, { text: "tiapa pls" }];

type TodoType = {
  text: string;
  id: number;
};

const TodosList = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const todoListHandler = (newTodo: TodoType) => {
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
  };

  const checkEmptyList =
    todoList.length === 0 ? (
      <p>Add a Todo bish!</p>
    ) : (
      <ul className={classes["todo-list"]}>
        {todoList.map((el) => (
          <Todo todo={el} key={el.id} />
        ))}
      </ul>
    );

  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
      <AddTodo addTodo={todoListHandler} />
      {checkEmptyList}
    </main>
  );
};

export default TodosList;
