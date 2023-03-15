import { useAppSelector } from "../../hooks/hooks";
import classes from "./CompletedTodos.module.css";
import Todo from "./Todo";

const CompletedTodos = () => {
  const todos = useAppSelector((state) => state.todoList.value);
  const completedTodoList = todos.filter((el) => el.completed);
  return (
    <div className={classes.container}>
      {completedTodoList.length ? (
        completedTodoList.map(
          (el) =>
            el.completed && (
              <div className={classes.todo} key={el.id}>
                <Todo todo={el} />
              </div>
            )
        )
      ) : (
        <div className={classes.swing}>
          <span>Completed Todos.. if there were any..!</span>
        </div>
      )}
    </div>
  );
};

export default CompletedTodos;
