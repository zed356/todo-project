import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Login from "../user/Login";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = (props: Props): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);

  const content = !auth ? <Login /> : <>{props.children} </>;
  return content;
};

export default ProtectedRoute;