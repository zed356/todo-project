import { Fragment } from "react";
import { useAppSelector } from "../hooks/hooks";
import { NavLink } from "react-router-dom";
import classes from "./navigation.module.css";

const Navigation = () => {
  const auth = useAppSelector((state) => state.auth.isAuth);
  const content = auth ? (
    <Fragment>
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
    </Fragment>
  ) : (
    <Fragment>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__active"] : classes["nav-link"])}
        to="/"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__active"] : classes["nav-link"])}
        to="/register"
      >
        Register
      </NavLink>
    </Fragment>
  );

  return (
    <nav>
      <div className={classes.control}>{content}</div>
    </nav>
  );
};

export default Navigation;
