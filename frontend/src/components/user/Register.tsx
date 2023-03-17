import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

const Register = () => {
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const confirmedPassword = confirmPasswordInputRef.current!.value;

    if (!email.includes("@") || email.trim().length < 6) {
      return setEmailErrorMsg("Please enter a valid email");
    }
    if (password !== confirmedPassword) {
      setPasswordErrorMsg("Passwords must match");
    } else if (password.trim().length < 4 || confirmedPassword.trim().length < 4) {
      return setPasswordErrorMsg("Password length must be at least 4 characters");
    }

    const user = {
      email,
      password,
    };

    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 201) {
      navigate("/");
    } else if (res.status === 400) {
      const param = data.errors[0].param;
      if (param === "password") {
        return setPasswordErrorMsg("Please enter matching passwords, min 4 characters");
      } else if (param === "email") {
        return setEmailErrorMsg("Please enter a valid email address!");
      }
    }
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
  };

  return (
    <div className={classes["form-control"]}>
      <form onSubmit={submitHandler}>
        <label>E-mail</label>
        <input ref={emailInputRef} name="email" id="email" type="text" />
        {emailErrorMsg && <span className={classes["error-msg"]}>{emailErrorMsg}</span>}
        <label>Password</label>
        <input ref={passwordInputRef} name="password" id="password" type="password" />
        <label>Confirm Password</label>
        <input
          ref={confirmPasswordInputRef}
          name="confirm-password"
          id="confirm-password"
          type="password"
        />
        {passwordErrorMsg && <span className={classes["error-msg"]}>{passwordErrorMsg}</span>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
