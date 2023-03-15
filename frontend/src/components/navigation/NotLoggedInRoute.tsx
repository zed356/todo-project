import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TodosList from "../todos/TodosList";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const NotLoggedInRoute = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);
  const content = auth ? <TodosList /> : <>{props.children}</>;
  return content;
};

export default NotLoggedInRoute;
