import Card from "../ui/Card";
import classes from "./CompletedTodos.module.css";

const CompletedTodos = () => {
  return (
    <div className={classes.container}>
      <Card>
        <div className={classes.temp}>Completed Todos.. to be completed!</div>
      </Card>
    </div>
  );
};

export default CompletedTodos;
