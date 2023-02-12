import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

import classes from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(login());
    navigate("/todos");
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-control"]}>
        <label htmlFor="username" className={classes["form-control__label"]}>
          Username
        </label>
        <input name="username" className={classes["form-control__input"]} type="text" />
        <label htmlFor="password" className={classes["form-control__label"]}>
          Password
        </label>
        <input name="password" className={classes["form-control__input"]} type="password" />
        <button className={classes["form-control__btn"]}>Login</button>
      </form>
    </div>
  );
};

export default Login;
