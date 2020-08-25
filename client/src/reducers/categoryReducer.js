import { CATEGORY_TYPES } from "../constants";

const {
  CRUD: { CREATE_CATEGORY },
} = CATEGORY_TYPES;

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return { ...state, addedcategory: action.response };

    default:
      return state;
  }
};

export default categoryReducer;
