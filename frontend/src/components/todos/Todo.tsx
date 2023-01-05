import classes from "./Todo.module.css";

interface Props {
  todo: {
    text: string;
    id: number;
  };
  deleteTodo: (a: number) => void;
}

const Todo = (props: Props) => {
  const deleteTodoHandler = () => {
    props.deleteTodo(props.todo.id);
  };

  const editHandler = () => {
    // Add this next!
  };

  return (
    <li className={classes.container}>
      <div className={classes.completed}>☑</div>
      <div className={classes.todo}>{props.todo.text}</div>
      <div onClick={deleteTodoHandler} className={classes.delete}>
        ✖
      </div>
      <div className={classes.edit}>🖊</div>
    </li>
  );
};

export default Todo;
