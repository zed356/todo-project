import classes from "./Todo.module.css";

const Todo = (props: { todo: { text: string } }) => {
  return <li className={classes.todo}>{props.todo.text}</li>;
};

export default Todo;
