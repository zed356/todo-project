import { useAppSelector } from "../../hooks/hooks";
import Todo from "./Todo";

const CompletedTodos = () => {
  const todos = useAppSelector((state) => state.todoList.value);
  const completedTodoList = todos.filter((el) => el.completed);
  return (
    <div className="flex flex-wrap justify-center">
      {completedTodoList.length ? (
        completedTodoList.map(
          (el) =>
            el.completed && (
              <div className="m-4" key={el.id}>
                <Todo todo={el} />
              </div>
            )
        )
      ) : (
        <div className="animate-swing origin-center mt-[3rem] shadow-md shadow-slate-500">
          <span className="p-1 block font-sans">Completed Todos.. if there were any..!</span>
        </div>
      )}
    </div>
  );
};

export default CompletedTodos;
