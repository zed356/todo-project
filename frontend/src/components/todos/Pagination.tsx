import Todo, { TodoType } from "./Todo";

interface Props {
  todos: TodoType[];
}

const Pagination = (props: Props) => {
  return (
    <>
      {props.todos.map((el: TodoType) => (
        <Todo todo={el} key={el.id} />
      ))}
    </>
  );
};

export default Pagination;
