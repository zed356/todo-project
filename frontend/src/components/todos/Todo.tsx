import React, { useRef, useState } from "react";
import Card from "../ui/Card";
import classes from "./Todo.module.css";

interface Props {
  todo: {
    text: string;
    id: number;
  };
  deleteTodo: (a: number) => void;
  updateTodo: (a: { id: number; text: string }) => void;
}

const Todo = (props: Props) => {
  const [editing, setEditing] = useState(false);
  const editedTodoRef = useRef<HTMLTextAreaElement>(null);

  const deleteTodoHandler = () => {
    props.deleteTodo(props.todo.id);
  };

  const editHandler = () => {
    // Add this next!
    setEditing(true);
  };

  const saveEditHandler = () => {
    if (editedTodoRef.current) {
      props.updateTodo({ id: props.todo.id, text: editedTodoRef.current.value });
    }
    setEditing(false);
  };

  const todoContent = !editing ? (
    <div className={classes.buttons}>
      <div className={classes.completed}>☑</div>
      <div onClick={editHandler} className={classes.edit}>
        🖊
      </div>
      <div onClick={deleteTodoHandler} className={classes.delete}>
        ✖
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
      {todoContent}
      {/* <Card> */}
      <div className={classes.todo}>
        {!editing ? (
          props.todo.text
        ) : (
          <textarea ref={editedTodoRef} defaultValue={props.todo.text} />
        )}
      </div>
      {/* </Card> */}
    </li>
  );
};

export default Todo;
