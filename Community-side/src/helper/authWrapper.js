import React from "react";
import history from "../history";

import store from "../store";
import { showErrorMessage } from "../actions";

const { getState } = store;

const devRoleChecker = (
  techRole = {
    role: null,
  }
) => (Component) => {
  const {
    user: { loggedUser },
  } = getState();

  if (!loggedUser) {
    history.push("/");
    return <Component loggedIn={false} techRole={null} />;
  }

  if (loggedUser.userRole === "dev") {
    if (loggedUser.techRole !== techRole.role) {
      history.push("/auth");
      store.dispatch(showErrorMessage("You are not authorized!"));
      setTimeout(() => {
        store.dispatch(showErrorMessage(null));
      }, 3200);
      return <Component loggedIn={false} techRole={null} />;
    }
  } else {
    if (loggedUser.userRole !== techRole.role) {
      history.push("/auth");
      store.dispatch(showErrorMessage("You are not authorized!"));
      setTimeout(() => {
        store.dispatch(showErrorMessage(null));
      }, 3200);
      return <Component loggedIn={false} techRole={null} />;
    }
  }

  return <Component loggedIn={true} techRole={techRole} />;
};

export default devRoleChecker;
