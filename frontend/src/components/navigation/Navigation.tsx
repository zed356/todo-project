import Logout from "components/user/Logout";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

const Navigation = () => {
  const auth = useAppSelector((state) => state.auth.isAuth);
  const content = auth ? (
    <Fragment>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-white bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6"
            : "text-white bg-sky-600 hover:bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6 transition-all duration-300 ease-in-out"
        }
        to="/todos"
      >
        Todos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-white bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6"
            : "text-white bg-sky-600 hover:bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6 transition-all duration-300 ease-in-out"
        }
        to="/completed"
      >
        Completed
      </NavLink>
      <div className="text-white bg-sky-600  inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6 transition-all duration-300 ease-in-out cursor-pointer no-underline hover:bg-red-600 active:bg-red-400">
        <Logout />
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hidden"
            : "text-white bg-sky-600 hover:bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6 transition-all duration-300 ease-in-out"
        }
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "hidden"
            : "text-white bg-sky-600 hover:bg-custom-bluegray inline-block my-2 mr-2 border-2 border-sky-600 rounded-3xl py-2 px-6 transition-all duration-300 ease-in-out"
        }
        to="/register"
      >
        Register
      </NavLink>
    </Fragment>
  );

  return (
    <nav>
      <div className="bg-custom-bluegray flex justify-end">{content}</div>
    </nav>
  );
};

export default Navigation;
