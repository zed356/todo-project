import { useAppDispatch } from "./hooks";
import { login, logout } from "store/authSlice";

const useVerify = async () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const parsedJwt = JSON.parse(jwt);
    const res = await fetch("http://localhost:8080/todos", {
      headers: {
        "x-access-token": parsedJwt,
      },
    });
    if (res.status === 200) {
      dispatch(login(parsedJwt));
      return;
    } else if (res.status === 401) {
      dispatch(logout());
      return;
    }
  } else {
    dispatch(logout());
    return;
  }
};

export default useVerify;
