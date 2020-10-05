import { PAYMENT_TYPES } from "../../constants";

const { CHECKOUT_SUCCESS, LOAD_CHECKOUT } = PAYMENT_TYPES;

export const loadCheckout = () => ({ type: LOAD_CHECKOUT });

export const checkoutSuccess = (session) => ({
  type: CHECKOUT_SUCCESS,
  session,
});
