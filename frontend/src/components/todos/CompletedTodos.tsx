import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import classes from "./CompletedTodos.module.css";
import Todo from "./Todo";

const CompletedTodos = () => {
  const todos = useSelector((state: RootState) => state.todoList.value);
  return (
    <div className={classes.container}>
      {todos.length ? (
        todos.map((el) => (
          <div className={classes.todo}>
            {" "}
            <Todo todo={el} key={el.id} />
          </div>
        ))
      ) : (
        <div className={classes.temp}>Completed Todos.. to be completed!</div>
      )}
    </div>
  );
};

export default CompletedTodos;
