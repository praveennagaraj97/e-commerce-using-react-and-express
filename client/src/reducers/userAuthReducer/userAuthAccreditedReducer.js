import { USER_AUTH_TYPES } from "../../constants";

const {
  AUTH: { ACCREDITED },
} = USER_AUTH_TYPES;

const userAccreditedReducer = (state = false, action) => {
  switch (action.type) {
    case ACCREDITED:
      return true;
    default:
      return state;
  }
};

export default userAccreditedReducer;
