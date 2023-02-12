import React, { useRef } from "react";
import Card from "../ui/Card";
import classes from "./AddTodo.module.css";
import { TodoType } from "./TodosList";

interface PropsType {
  addTodo: (a: TodoType) => void;
  inputError: (a: string) => void;
  addingTodo: () => void;
}

const AddTodo = (props: PropsType) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const submitTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) throw Error("inputRef is not assigned");
    if (inputRef.current.value.length === 0 || !isNaN(Number(inputRef.current.value))) {
      props.inputError("Enter a valid todo!");
      throw Error("Enter a valid todo!");
    }
    const todoTxt = inputRef.current.value;

    fetch("http://localhost:8080/add", {
      method: "POST",
      body: JSON.stringify({ text: todoTxt, completed: false }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .then((data) => {});

    props.addingTodo();
    inputRef.current.value = "";
  };

  return (
    <Card>
      <div className={classes.container}>
        <form id="todo" className={classes["form-control"]} onSubmit={submitTodoHandler}>
          <textarea form="todo" maxLength={50} ref={inputRef} placeholder="todo text" name="todo" />
          <label htmlFor="todo"></label>
          <button type="submit">Create</button>
        </form>
      </div>
    </Card>
  );
};

export default AddTodo;
