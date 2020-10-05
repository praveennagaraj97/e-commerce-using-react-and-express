import { takeLatest, select, put, call, takeEvery } from "redux-saga/effects";
import { loadStripe } from "@stripe/stripe-js";

import { PRODUCT_TYPES } from "../../constants";

import { checkoutLoading, getProductsDetailsInCart } from "../../actions";

import {
  globalErrorMessageHandler,
  globalSuccessMessageWithImageHandler,
} from "../HandleAlertSagas";

import {
  getProductsDetailsForGrpIdsEndPoint,
  buyProductsSessionEndpoint,
} from "../../api";

const {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  LOAD_PRODUCT_CART,
  LOAD_CHECKOUT,
} = PRODUCT_TYPES;

const getProductsListFromStore = ({ productsList }) => productsList;

// Cart

const getCartStatefromStore = ({ productCart }) => productCart;

function* handleProductAddCartWorker() {
  const { addedItem } = yield select(getCartStatefromStore);
  const { products } = yield select(getProductsListFromStore);

  const addedProduct = yield products.find((item) => item._id === addedItem);
  const { productCoverImage, productName } = addedProduct;
  const message = `${productName} added to cart😍`;
  yield call(globalSuccessMessageWithImageHandler, message, productCoverImage);
}

function* handleProductRemoveCartWorker() {
  // const { cart } = yield select(getCartStatefromStore);
}

// Add and remove watcher

const addQuantityPropToCart = (cartItems) => {
  const result = {};
  cartItems.forEach((item) => {
    result[item] = (result[item] || 0) + 1;
  });
  return result;
};

export function* productCartWatcher() {
  yield takeEvery(ADD_PRODUCT_TO_CART, handleProductAddCartWorker);
  yield takeEvery(REMOVE_PRODUCT_FROM_CART, handleProductRemoveCartWorker);
}

function* handleproductCartWorker() {
  const { cart } = yield select(getCartStatefromStore);
  if (cart.length < 1) return put(getProductsDetailsInCart([]));

  const qunatityOfCartItems = addQuantityPropToCart(cart);
  try {
    const { data } = yield call(getProductsDetailsForGrpIdsEndPoint, {
      cartItems: cart,
    });
    data.details.map((item) => {
      item.quantity = qunatityOfCartItems[item._id];
      item.price = item.productPrice * item.quantity;
      return item;
    });

    yield put(getProductsDetailsInCart(data.details));
  } catch (err) {
    // yield console.clear();
    yield call(
      globalErrorMessageHandler,
      "Something went wrong try again later!"
    );
  }
}

export function* productCartLoadWatcher() {
  yield takeLatest(LOAD_PRODUCT_CART, handleproductCartWorker);
}

// Checkout
const stripePromise = loadStripe(
  "pk_test_51HYtDFLCMj9x3nR3UVeGBuAyKSdyjCNZkou1DUa4vpJoIspv2xVyH0H2Bzzk3e4jJplpqWuE44dn6Nz4zwW8jmJk00DxC4rymc"
);

function* productsCheckoutWorker() {
  yield put(checkoutLoading(true));

  const { cart } = yield select(getCartStatefromStore);

  if (cart) {
    if (!cart.length) {
      yield call(
        globalErrorMessageHandler,
        "No Products listed under checkout"
      );
      return;
    }
  }
  const stripe = yield stripePromise;

  yield console.log(cart);

  try {
    const {
      data: { id },
    } = yield call(buyProductsSessionEndpoint, { products: cart });

    const result = yield stripe.redirectToCheckout({
      sessionId: id,
    });

    yield console.log(result);
  } catch (err) {}
}

export function* loadProductsCheckoutWatcher() {
  yield takeEvery(LOAD_CHECKOUT, productsCheckoutWorker);
}
