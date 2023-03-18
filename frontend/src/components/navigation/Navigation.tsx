import { Fragment } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { NavLink } from "react-router-dom";
import classes from "./navigation.module.css";
import Logout from "components/user/Logout";

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
      <div className={`${classes["nav-link"]} ${classes["nav-link__logout"]}`}>
        <Logout />
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__hidden"] : classes["nav-link"])}
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? classes["nav-link__hidden"] : classes["nav-link"])}
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
