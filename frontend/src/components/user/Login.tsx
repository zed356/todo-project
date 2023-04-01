import Button from "components/ui/Button";
import LoadingSpinner from "components/ui/LoadingSpinner";
import useHttp from "hooks/useHttp";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputErrorMsg, setInputErrorMsg] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { sendRequest, isLoading, data, error } = useHttp();

  // '/' route directs to /login if no token present.
  // This will set url to /login so that nav bar doesn't display the login button.
  useEffect(() => {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (error) {
      setInputErrorMsg("Please enter valid login credentials");
    } else if (data) {
      dispatch(login(data.token));
      navigate("/todos");
    }
  }, [data, error, dispatch, navigate]);

  // Sends a login request. Will re-render component either by setting 'error' or 'data'
  // Thus firing the 2nd useEffect which will either authenticate the user or throw an error.
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

    sendRequest({
      url: "http://localhost:8080/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
      reqAuth: false,
    });
  };

  return (
    <div className="flex justify-center w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          onSubmit={loginHandler}
          className="flex flex-col items-center w-[11%] border-[1px] border-sky-600 rounded-lg p-4 mt-12"
        >
          <label htmlFor="email">E-mail</label>
          <input className="w-full" ref={emailInputRef} name="email" type="text" />
          <label htmlFor="password">Password</label>
          <input className="w-full" ref={passwordInputRef} name="password" type="password" />
          <section className="mt-2 text-[red] flex flex-col">{inputErrorMsg}</section>
          <Button type="submit">Login</Button>
        </form>
      )}
    </div>
  );
};

export default Login;
