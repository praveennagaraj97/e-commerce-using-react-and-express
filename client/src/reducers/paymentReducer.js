import { PAYMENT_TYPES } from "../constants";

const { CHECKOUT_SUCCESS } = PAYMENT_TYPES;

const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      return { ...state, sessionId: action.session };
    default:
      return state;
  }
};

export default paymentReducer;
