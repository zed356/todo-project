import { useState, useEffect } from "react";
import Todo, { TodoType } from "./Todo";

interface Props {
  todos: TodoType[];
}

const Pagination = (props: Props) => {
  const [curPage, setCurPage] = useState(1);
  const [nudge, setNudge] = useState(false);
  const elPerPage: number = 4;
  const maxPages = Math.ceil(props.todos.length / elPerPage);
  const visibleTodos = props.todos.slice(elPerPage * curPage - elPerPage, elPerPage * curPage);

  const incrementCurPage = () => {
    curPage < maxPages && setCurPage((curPage) => (curPage += 1));
  };

  const decrementCurPage = () => {
    curPage > 1 && setCurPage((curPage) => (curPage -= 1));
  };

  useEffect(() => {
    setNudge(true);
    const timer = setTimeout(() => setNudge(false), 100);
    return () => clearTimeout(timer);
  }, [curPage, setNudge]);

  // If all todos deleted in a page, go back one page if possible.
  curPage > maxPages && decrementCurPage();

  return (
    <section className="flex flex-col items-center">
      {maxPages > 1 && (
        <div className="flex mb-4">
          <span
            onClick={decrementCurPage}
            className={`${
              curPage === 1 && "invisible"
            } mx-4 select-none transition-all duration-75 cursor-default text-custom-bluegray hover:text-black hover:scale-[1.5] scale-[1.4]`}
          >
            {"⬅"}
          </span>

          <span className={`${nudge && "animate-ping"} select-none text-custom-bluegray`}>
            {curPage}
          </span>

          <span
            onClick={incrementCurPage}
            className={`${
              curPage === maxPages && "invisible"
            } mx-4 select-none transition-all duration-75 cursor-default text-custom-bluegray hover:text-black hover:scale-[1.5] scale-[1.4]`}
          >
            {"➡"}
          </span>
        </div>
      )}
      {visibleTodos.map((el: TodoType) => (
        <Todo todo={el} key={el.id} />
      ))}
    </section>
  );
};

export default Pagination;
