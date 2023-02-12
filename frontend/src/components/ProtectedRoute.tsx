import { useContext } from "react";
import Auth from "../store/auth";
import Login from "./Login";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = (props: Props): JSX.Element => {
  const ctx = useContext(Auth);

  const content = !ctx.auth ? <Login /> : <>{props.children} </>;
  return content;
};

export default ProtectedRoute;
