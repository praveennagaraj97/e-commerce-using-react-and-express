import { takeEvery, call, put, select } from "redux-saga/effects";

import { PAYMENT_TYPES } from "../constants";
import { checkoutLoading, checkoutSuccess } from "../actions";
import { buyProductsViaPaymentIntentEndpoint } from "../api";
import history from "../history";
import { globalErrorMessageHandler } from "./HandleAlertSagas";

const { LOAD_CHECKOUT } = PAYMENT_TYPES;

const getCartStatefromStore = ({ productCart }) => productCart;

// Checkout
function* productsCheckoutWorker() {
  yield put(checkoutLoading(true));

  const { cart } = yield select(getCartStatefromStore);

  if (cart) {
    if (!cart.length) {
      yield call(
        globalErrorMessageHandler,
        "No Products listed under checkout"
      );
      return yield put(checkoutLoading(false));
    }
  }

  try {
    const {
      data: { clientSecret },
    } = yield call(buyProductsViaPaymentIntentEndpoint, { products: cart });

    yield put(checkoutSuccess(clientSecret));
    yield put(checkoutLoading(false));
    if (clientSecret) {
      history.push(`/checkout/session`);
      return;
    }
  } catch (err) {
    console.clear();
    try {
      yield put(checkoutLoading(false));
      yield call(globalErrorMessageHandler, err.response.data.message);
    } catch (e) {
      yield put(checkoutLoading(false));
      yield call(globalErrorMessageHandler, "Sorry Something we");
    }
  }
}

export function* loadProductsCheckoutWatcher() {
  yield takeEvery(LOAD_CHECKOUT, productsCheckoutWorker);
}
