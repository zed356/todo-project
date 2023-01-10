import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../store/auth";
import classes from "./navigation.module.css";

const Navigation = () => {
  const ctx = useContext(Auth);
  const content = ctx.auth ? (
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
