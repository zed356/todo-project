import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../store/store";
import classes from "./navigation.module.css";

const Navigation = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const content = auth ? (
    <React.Fragment>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__active"] : classes["nav-link"])}
        to="/todos"
      >
        Todos
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__active"] : classes["nav-link"])}
        to="/completed"
      >
        Completed
      </NavLink>
    </React.Fragment>
  ) : (
    <NavLink
      className={({ isActive }) => (isActive ? classes["nav-link__active"] : classes["nav-link"])}
      to="/"
    >
      Login
    </NavLink>
  );

  return (
    <nav>
      <div className={classes.control}>{content}</div>
    </nav>
  );
};

export default Navigation;
