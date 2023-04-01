import Button from "components/ui/Button";
import LoadingSpinner from "components/ui/LoadingSpinner";
import useHttp from "hooks/useHttp";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const { sendRequest, isLoading, data, error } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setEmailErrorMsg("Please enter valid login credentials");
    } else if (data) {
      navigate("/");
    }
  }, [data, error, navigate]);

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

    sendRequest({
      url: "http://localhost:8080/register",
      method: "POST",
      body: JSON.stringify(user),
      reqAuth: false,
    });

    setEmailErrorMsg("");
    setPasswordErrorMsg("");
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col mt-12 items-center w-[11%] border-[1px] border-sky-600 rounded-lg p-4"
          onSubmit={submitHandler}
        >
          <label>E-mail</label>
          <input className="w-full" ref={emailInputRef} name="email" id="email" type="text" />
          {emailErrorMsg && <span className="text-[red]">{emailErrorMsg}</span>}
          <label>Password</label>
          <input
            className="w-full"
            ref={passwordInputRef}
            name="password"
            id="password"
            type="password"
          />
          <label className="text-center">Confirm Password</label>
          <input
            className="w-full"
            ref={confirmPasswordInputRef}
            name="confirm-password"
            id="confirm-password"
            type="password"
          />
          {passwordErrorMsg && <span className="text-[red]">{passwordErrorMsg}</span>}
          <Button type="submit">Register</Button>
        </form>
      )}
    </div>
  );
};

export default Register;
