import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import classes from "./navigation.module.css";

const Navigation = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const content = auth ? (
    <React.Fragment>
      <Link className={classes["nav-link"]} to="/todos">
        Todos
      </Link>
      <Link className={classes["nav-link"]} to="/completed">
        Completed
      </Link>
    </React.Fragment>
  ) : (
    <Link className={classes["nav-link"]} to="/">
      Login
    </Link>
  );

  return (
    <nav>
      <div className={classes.control}>{content}</div>
    </nav>
  );
};

export default Navigation;
