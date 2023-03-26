import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";

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
    <div className="flex justify-center w-full">
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center w-[11%] border-[1px] border-sky-600 rounded-lg p-4 mt-12"
      >
        <label htmlFor="email">E-mail</label>
        <input className="w-full" ref={emailInputRef} name="email" type="text" />
        <label htmlFor="password">Password</label>
        <input className="w-full" ref={passwordInputRef} name="password" type="password" />
        <section className="mt-2 text-[red] flex flex-col">{inputErrorMsg}</section>
        <button className="m-auto mt-2 align-middle w-20 border-[1px] border-sky-600 rounded-md hover:bg-green-400 active:bg-green-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
