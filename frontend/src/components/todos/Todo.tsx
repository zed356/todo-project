import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteTodo, updateTodo } from "../../store/todoListSlice";
import classes from "./Todo.module.css";

interface Props {
  todo: TodoType;
}

export type TodoType = {
  _id?: string;
  text: string;
  id: string;
  completed: boolean;
  dateCreated: string;
  dateCompleted?: string;
};

const Todo = (props: Props) => {
  const [editing, setEditing] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const editedTodoRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const authHeader = useSelector((state: RootState) => state.auth.authHeader);

  const deleteTodoHandler = async () => {
    const res = await fetch(`http://localhost:8080/delete/${props.todo.id}`, {
      method: "DELETE",
      headers: authHeader,
    });
    res.status === 200 && dispatch(deleteTodo(props.todo.id));
  };

  const updateTodoHandler = async (updatedTodo: TodoType) => {
    const res = await fetch(`http://localhost:8080/update/${updatedTodo.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: updatedTodo.text,
        completed: updatedTodo.completed,
        dateCompleted: updatedTodo.dateCompleted,
      }),
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });
    res.status === 201 && dispatch(updateTodo(updatedTodo));
  };

  const editHandler = () => {
    setEditing(true);
  };

  const saveEditHandler = () => {
    if (editedTodoRef.current!.value) {
      updateTodoHandler({ ...props.todo, text: editedTodoRef.current!.value });
    } else {
      deleteTodoHandler();
    }
    setEditing(false);
  };

  const completedHandler = () => {
    if (props.todo.completed) {
      updateTodoHandler({ ...props.todo, completed: false });
    } else {
      updateTodoHandler({ ...props.todo, completed: true, dateCompleted: new Date().toString() });
    }
  };

  const dateString = (dates: string) => {
    const todoDate = new Date(dates);
    return `${("0" + todoDate.getDate()).slice(-2)}/${("0" + (todoDate.getMonth() + 1)).slice(
      -2
    )}/${todoDate.getFullYear().toString().slice(2)} ${("0" + todoDate.getHours()).slice(-2)}:${(
      "0" + todoDate.getMinutes()
    ).slice(-2)}`;
  };

  const todoIfNotCompleted = !editing ? (
    <div className={classes["top-todo-container"]}>
      <span>{dateString(props.todo.dateCreated)}</span>
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
      <span>
        {dateString(props.todo.dateCreated)} {"-->"} {dateString(props.todo.dateCompleted!)}
      </span>
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
        {props.todo.completed ? todoIfCompleted : todoIfNotCompleted}
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
