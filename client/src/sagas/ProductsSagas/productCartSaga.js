import { takeLatest, select, put, call, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import {
  // Error Or Success Messager
  globalFailureMessenger,
  globalSuccesMessengerWithImg,

  // Products details by it's ID's
  getProductsDetailsInCart,
} from "../../actions";

import { getProductsDetailsForGrpIdsEndPoint } from "../../api";

const {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  LOAD_PRODUCT_CART,
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
  yield put(globalSuccesMessengerWithImg(message, productCoverImage));
  yield delay(3200);
  yield put(globalSuccesMessengerWithImg(null, null));
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
  yield takeLatest(ADD_PRODUCT_TO_CART, handleProductAddCartWorker);
  yield takeLatest(REMOVE_PRODUCT_FROM_CART, handleProductRemoveCartWorker);
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
    yield put(globalFailureMessenger("Something went wrong try again later!"));
    yield delay(3200);
    yield put(globalFailureMessenger(null));
  }
}

export function* productCartLoadWatcher() {
  yield takeLatest(LOAD_PRODUCT_CART, handleproductCartWorker);
}
