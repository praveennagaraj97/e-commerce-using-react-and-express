import { USER_TYPES } from "../constants";

const { LOGGED_USER, LOAD_LOGIN } = USER_TYPES;

export const loadLogin = () => ({ type: LOAD_LOGIN });

export const loggedUser = (user) => ({ type: LOGGED_USER, user });
