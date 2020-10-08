import { LOADERS } from "../constants";

const { LOGIN_LOADING } = LOADERS;

export const loginLoading = (state) => ({ type: LOGIN_LOADING, state });
