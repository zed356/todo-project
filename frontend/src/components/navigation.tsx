import { Link } from "react-router-dom";
import classes from "./navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <div className={classes.control}>
        <Link className={classes["nav-link"]} to="/">
          Todos
        </Link>
        <Link className={classes["nav-link"]} to="/completed">
          Completed
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
