import { useAppSelector } from "../../hooks/hooks";
import classes from "./CompletedTodos.module.css";
import Todo from "./Todo";

const CompletedTodos = () => {
  const todos = useAppSelector((state) => state.todoList.value);
  return (
    <div className={classes.container}>
      {todos.length ? (
        todos.map(
          (el) =>
            el.completed && (
              <div className={classes.todo} key={el.id}>
                <Todo todo={el} />
              </div>
            )
        )
      ) : (
        <div className={classes.temp}>Completed Todos.. if there were any..!</div>
      )}
    </div>
  );
};

export default CompletedTodos;
