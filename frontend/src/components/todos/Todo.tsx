import { useRef, useState } from "react";
import classes from "./Todo.module.css";
import { TodoType } from "./TodosList";

interface Props {
  todo: TodoType;
  deleteTodo?: (a: string) => void;
  updateTodo?: (a: TodoType) => void;
}

const Todo = (props: Props) => {
  const [editing, setEditing] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const editedTodoRef = useRef<HTMLTextAreaElement>(null);

  const deleteTodoHandler = () => {
    props.deleteTodo!(props.todo.id);
  };

  const editHandler = () => {
    setEditing(true);
  };

  const saveEditHandler = () => {
    if (editedTodoRef.current) {
      props.updateTodo!({ ...props.todo, text: editedTodoRef.current.value });
    }
    console.log(props.todo.date);
    setEditing(false);
  };

  const completedHandler = () => {
    if (props.todo.completed) {
      props.updateTodo!({ ...props.todo, completed: false });
    } else {
      props.updateTodo!({ ...props.todo, completed: true });
    }
  };

  const todoDate = new Date(props.todo.date);
  const dateString = `${("0" + todoDate.getDate()).slice(-2)}/${(
    "0" +
    (todoDate.getMonth() + 1)
  ).slice(-2)}/${todoDate
    .getFullYear()
    .toString()
    .slice(2)} ${todoDate.getHours()}:${todoDate.getMinutes()}`;

  const todoIfNotCompleted = !editing ? (
    <div className={classes["top-todo-container"]}>
      <span>{dateString}</span>
      <div className={classes.buttons}>
        <div className={classes.completed} onClick={completedHandler}>
          ☑
        </div>
        <div onClick={editHandler} className={classes.edit}>
          🖊
        </div>
        <div onClick={deleteTodoHandler} className={classes.delete}>
          ✖
        </div>
      </div>
    </div>
  ) : (
    <div className={classes["save-container"]}>
      <div onClick={saveEditHandler} className={classes.saveEditedTodo}>
        💾
      </div>
    </div>
  );

  const todoIfCompleted = (
    <div className={classes["top-todo-container"]}>
      <span>{dateString}</span>
      <div className={classes.buttons}>
        <div
          className={classes["if-completed"]}
          onClick={completedHandler}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {!isHovering ? "☑" : "◻"}
        </div>
        <div onClick={deleteTodoHandler} className={classes.delete}>
          ✖
        </div>
      </div>
    </div>
  );

  return (
    <li className={classes["list-item"]}>
      <div className={classes.todo}>
        {!props.todo.completed ? todoIfNotCompleted : todoIfCompleted}
        {!editing ? (
          <p>{props.todo.text}</p>
        ) : (
          <textarea ref={editedTodoRef} defaultValue={props.todo.text} />
        )}
      </div>
    </li>
  );
};

export default Todo;
