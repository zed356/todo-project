import Button from "components/ui/Button";
import React, { useRef, Fragment } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addTodo } from "../../store/todoListSlice";
import Card from "../ui/Card";
import useHttp from "hooks/useHttp";

interface PropsType {
  inputError: (a: string) => void;
}

const AddTodo = (props: PropsType) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { sendRequest, isLoading } = useHttp();

  const submitTodoHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!inputRef.current) throw Error("inputRef is not assigned");
      if (!inputRef.current.value.length || !isNaN(Number(inputRef.current.value))) {
        throw Error("Enter a valid todo!");
      }
      const todoTxt = inputRef.current.value;

      const resData = await sendRequest({
        url: "http://localhost:8080/add",
        method: "POST",
        body: JSON.stringify({ text: todoTxt, completed: false, dateCreated: new Date() }),
        reqAuth: true,
      });
      // resData will only exist if the http request was successful
      if (resData) {
        dispatch(
          addTodo({
            id: resData.newTodo._id,
            text: resData.newTodo.text,
            completed: false,
            dateCreated: resData.newTodo.dateCreated,
          })
        );
      }
    } catch (error: any) {
      props.inputError(error.message);
    }
    inputRef.current!.value = "";
  };

  return (
    <Fragment>
      <Card>
        <form id="todo" className="flex flex-col" onSubmit={submitTodoHandler}>
          <textarea
            className="resize-none leading-5 focus:outline  focus:outline-sky-600 focus:outline-1"
            form="todo"
            maxLength={50}
            ref={inputRef}
            placeholder="todo text"
            name="todo"
          />
          <label htmlFor="todo"></label>
          <Button isLoading={isLoading} type="submit">
            Create
          </Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddTodo;
