import React from "react";

import "../../styles/header.scss";
import history from "../../history";
import { useDispatch, useSelector } from "react-redux";
import { removeSessionItem } from "../../utils";
import { loggedUser } from "../../actions";

const Header = () => {
  const user = useSelector(({ user: { loggedUser } }) => loggedUser);

  const dispatch = useDispatch();

  return (
    <div className='header-container'>
      <header onClick={() => history.push("/")} className='header-title'>
        Lexa
      </header>
      <div className='userRole'>
        {!user ? (
          <button onClick={() => history.push("/auth")}>Login</button>
        ) : (
          <>
            <button
              onClick={() => {
                removeSessionItem("AUTH_TOKEN");
                dispatch(loggedUser(null));
                history.push("/");
              }}
            >
              Logout
            </button>

            <button
              onClick={() =>
                history.push(
                  `${user.userRole === "dev" ? user.techRole : user.userRole}`
                )
              }
            >
              Works
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
