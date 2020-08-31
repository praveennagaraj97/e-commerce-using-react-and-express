import { takeLatest, select, put, call, delay } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import {
  // Error Or Success Messager
  globalFailureMessenger,
  globalSuccesMessengerWithImg,
} from "../../actions";

import { getProductsDetailsInCartEndPoint } from "../../api";

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
export function* productCartWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_CART, handleProductAddCartWorker);
  yield takeLatest(REMOVE_PRODUCT_FROM_CART, handleProductRemoveCartWorker);
}

//
//
function* handleproductCartWorker() {
  const { cart } = yield select(getCartStatefromStore);
  if (cart.length < 1) return;
  try {
    const response = yield call(getProductsDetailsInCartEndPoint, {
      cartItems: cart,
    });
    yield console.log(response);
  } catch (err) {
    yield put(globalFailureMessenger("Something went wrong try again later!"));
    yield delay(3200);
    yield put(globalFailureMessenger(null));
  }
}

export function* productCartLoadWatcher() {
  yield takeLatest(LOAD_PRODUCT_CART, handleproductCartWorker);
}
