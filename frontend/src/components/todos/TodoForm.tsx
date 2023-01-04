import Card from "../ui/Card";
import classes from "./TodoForm.module.css";

const TodoForm = () => {
  return (
    <Card>
      <div className={classes.container}>
        <form className={classes["form-control"]}>
          <input type="text" placeholder="todo text" name="todo" />
          <label htmlFor="todo"></label>
        </form>
        <button>Create</button>
      </div>
    </Card>
  );
};

export default TodoForm;
