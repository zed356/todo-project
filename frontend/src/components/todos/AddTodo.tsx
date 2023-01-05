import React, { useRef } from "react";
import Card from "../ui/Card";
import classes from "./AddTodo.module.css";

interface PropsType {
  addTodo: (a: { text: string; id: number }) => void;
}

const AddTodo = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputRef.current) throw Error("inputRef is not assigned");
    if (inputRef.current.value.length === 0 || !isNaN(Number(inputRef.current.value)))
      throw Error("Enter a valid todo!");
    props.addTodo({ text: inputRef.current.value, id: Math.random() });
    inputRef.current.value = "";
  };

  return (
    <Card>
      <div className={classes.container}>
        <form className={classes["form-control"]} onSubmit={submitTodoHandler}>
          <input ref={inputRef} type="text" placeholder="todo text" name="todo" />
          <label htmlFor="todo"></label>
          <button type="submit">Create</button>
        </form>
      </div>
    </Card>
  );
};

export default AddTodo;
