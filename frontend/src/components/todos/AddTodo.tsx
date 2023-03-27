import Button from "components/ui/Button";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useAppDispatch } from "../../hooks/hooks";
import { addTodo } from "../../store/todoListSlice";
import Card from "../ui/Card";

interface PropsType {
  inputError: (a: string) => void;
  addingTodo: () => void;
}

const AddTodo = (props: PropsType) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const authHeader = useSelector((state: RootState) => state.auth.authHeader);

  const submitTodoHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) throw Error("inputRef is not assigned");
    if (!inputRef.current.value.length || !isNaN(Number(inputRef.current.value))) {
      props.inputError("Enter a valid todo!");
      throw Error("Enter a valid todo!");
    }
    const todoTxt = inputRef.current.value;

    const res = await fetch("http://localhost:8080/add", {
      method: "POST",
      body: JSON.stringify({ text: todoTxt, completed: false, dateCreated: new Date() }),
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });
    const data = await res.json();
    res.status === 201 &&
      dispatch(
        addTodo({
          id: data.newTodo._id,
          text: data.newTodo.text,
          completed: false,
          dateCreated: data.newTodo.dateCreated,
        })
      );

    inputRef.current.value = "";
  };

  return (
    <Card>
      <form id="todo" className="flex flex-col" onSubmit={submitTodoHandler}>
        <textarea
          className="resize-none focus:outline  focus:outline-sky-600 focus:outline-1"
          form="todo"
          maxLength={50}
          ref={inputRef}
          placeholder="todo text"
          name="todo"
        />
        <label htmlFor="todo"></label>
        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};

export default AddTodo;
