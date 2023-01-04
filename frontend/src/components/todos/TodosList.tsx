import Todo from "./Todo";
import TodoForm from "./TodoForm";
import classes from "./TodosList.module.css";

const DUMMY_TODOS = [{ text: "dis pls" }, { text: "meow pls" }, { text: "tiapa pls" }];

const TodosList = () => {
  return (
    <main className={classes.main}>
      <h2 className={classes.header}>Todos</h2>
      <TodoForm />
      <ul className={classes.todolist}>
        {DUMMY_TODOS.map((el) => (
          <Todo todo={el} />
        ))}
      </ul>
    </main>
  );
};

export default TodosList;
