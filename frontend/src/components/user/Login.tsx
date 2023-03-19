import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import classes from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  });

  const loginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const email = emailInputRef.current!.value || "";
    const password = passwordInputRef.current!.value || "";
    setInputErrorMsg("");

    if (!email.includes("@") || email.trim().length < 6) {
      return setInputErrorMsg("Please enter a valid email");
    }
    if (password.trim().length < 4) {
      return setInputErrorMsg("Password length must be at least 4 characters");
    }

    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 401) {
      return setInputErrorMsg("Please enter valid login credentials");
    } else if (res.status === 200) {
      const data = await res.json();
      dispatch(login(data.token));
      navigate("/todos");
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-control"]}>
        <label htmlFor="email">E-mail</label>
        <input ref={emailInputRef} name="email" type="text" />
        <label htmlFor="password" className={classes["form-control--label"]}>
          Password
        </label>
        <input ref={passwordInputRef} name="password" type="password" />
        <section className={classes["form-control__error-msg"]}>{inputErrorMsg}</section>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
