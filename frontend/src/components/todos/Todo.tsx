import { useRef, useState } from "react";
import classes from "./Todo.module.css";
import { TodoType } from "./TodosList";

interface Props {
  todo: TodoType;
  deleteTodo?: (a: string) => void;
  updateTodo?: (a: TodoType) => void;
  completeTodo?: (a: TodoType) => void;
}

const Todo = (props: Props) => {
  const [editing, setEditing] = useState(false);
  const editedTodoRef = useRef<HTMLTextAreaElement>(null);

  const deleteTodoHandler = () => {
    props.deleteTodo!(props.todo.id);
  };

  const editHandler = () => {
    // Add this next!
    setEditing(true);
  };

  const saveEditHandler = () => {
    if (editedTodoRef.current) {
      props.updateTodo!({ ...props.todo, text: editedTodoRef.current.value });
    }
    setEditing(false);
  };

  const completedHandler = () => {
    props.completeTodo!(props.todo);
  };

  const todoContent = !editing ? (
    <div className={classes["top-todo-container"]}>
      <span>Date</span>
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

  return (
    <li className={classes["list-item"]}>
      <div className={classes.todo}>
        {todoContent}
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
