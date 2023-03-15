import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = (props: Props): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    !auth && navigate("/login");
  }, [auth, navigate]);

  return <>{props.children}</>;
};

export default ProtectedRoute;
