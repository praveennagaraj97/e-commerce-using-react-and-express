import { LOAD_CRUD, FAILED_CRUD } from "../constants";

const crudReducer = (state = { crudOperation: false, error: null }, action) => {
  switch (action.type) {
    case LOAD_CRUD:
      return { ...state, crudOperation: action.boolean };
    case FAILED_CRUD:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default crudReducer;
