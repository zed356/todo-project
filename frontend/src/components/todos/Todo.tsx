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

  return (
    <li className={classes.container}>
      <div className={classes.todo}>{props.todo.text}</div>
      <div onClick={deleteTodoHandler} className={classes.delete}>
        ✖
      </div>
    </li>
  );
};

export default Todo;
