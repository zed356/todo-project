import Card from "../ui/Card";
import classes from "./CompletedTodos.module.css";

const CompletedTodos = () => {
  return (
    <Card>
      <div className={classes.temp}>Completed Todos.. to be completed!</div>
    </Card>
  );
};

export default CompletedTodos;
