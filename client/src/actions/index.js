import {
  LOAD_CRUD,
  FAILED_CRUD,
  GLOBAL_ERROR,
  GLOBAL_SUCCESS,
} from "../constants";

export { createCategory } from "./CategoryActions";

export const loadCrud = (boolean) => ({ type: LOAD_CRUD, boolean });
export const failedCrud = (error) => ({ type: FAILED_CRUD, error });

export const globalError = (error) => ({ type: GLOBAL_ERROR, error });
export const globalSuccess = (success) => ({ type: GLOBAL_SUCCESS, success });
