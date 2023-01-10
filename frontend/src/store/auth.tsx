import { createContext, useState } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const initialValue = {
  auth: false,
  login: () => {},
};

const Auth = createContext(initialValue);

export const AuthContextProvider = (props: Props) => {
  const [auth, setAuth] = useState(false);

  const setAuthHandler = () => {
    setAuth((prev) => !prev);
  };

  return <Auth.Provider value={{ auth, login: setAuthHandler }}>{props.children}</Auth.Provider>;
};

export default Auth;
