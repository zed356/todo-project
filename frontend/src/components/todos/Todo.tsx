import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteTodo, updateTodo } from "../../store/todoListSlice";

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
    <div className="flex justify-between border-b border-sky-600">
      <span className="italic text-sm text-custom-bluegray flex items-center">
        {dateString(props.todo.dateCreated)}
      </span>
      <div className="flex justify-end">
        <div
          className="ml-2 text-slate-400 scale-[1.05] cursor-default transition-all duration-100 ease-in-out hover:text-green-500 hover:scale-[1.1]"
          onClick={completedHandler}
        >
          ☑
        </div>
        <div
          onClick={editHandler}
          className="ml-2 text-gray-600 scale-[1.05]  cursor-default transition-all duration-100 ease-in-out hover:text-[black] hover:scale-[1.1]"
        >
          🖊
        </div>
        <div
          onClick={deleteTodoHandler}
          className="ml-2  cursor-default transition-all duration-100 ease-in-out hover:text-[red] hover:scale-[1.1]"
        >
          ✖
        </div>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div
        onClick={saveEditHandler}
        className="cursor-default transition-all duration-100 hover:scale-[1.1]"
      >
        💾
      </div>
    </div>
  );

  const todoIfCompleted = (
    <div className="flex justify-between border-b border-sky-600">
      <span className="italic text-sm text-custom-bluegray flex items-center">
        {dateString(props.todo.dateCreated)} {"-->"} {dateString(props.todo.dateCompleted!)}
      </span>
      <div className="flex justify-end">
        <div
          className="text-green-500 scale-[1.1] hover:scale-[1.24] hover:text-[red] transition-all duration-100 delay-75 ease-in-out cursor-default"
          onClick={completedHandler}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {!isHovering ? "☑" : "◻"}
        </div>
        <div
          onClick={deleteTodoHandler}
          className="ml-2  cursor-default transition-all duration-100 ease-in-out hover:text-[red] hover:scale-[1.1]"
        >
          ✖
        </div>
      </div>
    </div>
  );

  return (
    <li className="flex list-none mx-4 mb-2 flex-col items-center w-full">
      <div className="border border-sky-600 rounded-lg px-2 bg-slate-50 w-full h-auto break-normal whitespace-pre-wrap overflow-hidden">
        {props.todo.completed ? todoIfCompleted : todoIfNotCompleted}
        {!editing ? (
          <p className="mt-[0.3rem] mb-2">{props.todo.text}</p>
        ) : (
          <textarea
            className="mt-[0.3rem] mb-2 w-full resize-none box-border"
            ref={editedTodoRef}
            defaultValue={props.todo.text}
          />
        )}
      </div>
    </li>
  );
};

export default Todo;
