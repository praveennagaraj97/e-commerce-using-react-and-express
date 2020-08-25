import { CATEGORY_TYPES } from "../constants";
import { addNewCategory } from "../api";

import { failedCrud } from "./";

const {
  CRUD: { CREATE_CATEGORY },
} = CATEGORY_TYPES;

export const createCategory = (inputData) => async (dispatch) => {
  try {
    const { data } = await addNewCategory(inputData);
    dispatch({ type: CREATE_CATEGORY, response: data });
  } catch (err) {
    try {
      dispatch(failedCrud(err.response.data.message));
    } catch (err) {
      dispatch(failedCrud("Something went Wrong"));
    }
  }
};
