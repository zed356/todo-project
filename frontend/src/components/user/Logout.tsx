import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "store/authSlice";
import { RootState } from "store/store";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (auth) {
      dispatch(logout());
      navigate("/");
    }
  };

  return <div onClick={logoutHandler}>Logout</div>;
};

export default Logout;
