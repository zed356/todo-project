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
    console.log(inputRef.current.value);
    props.addTodo({ text: inputRef.current.value, id: Math.random() });
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
