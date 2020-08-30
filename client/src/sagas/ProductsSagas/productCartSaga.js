import { takeLatest, select, call, put } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";
import { getProductsBasedOnQuery } from "../../api";

import {
  // Error Or Success Messager
  globalSuccesMessengerWithImg,
} from "../../actions";

const { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } = PRODUCT_TYPES;

const getProductsListFromStore = ({ productsList }) => productsList;

// Cart

const getCartStatefromStore = ({ productCart }) => productCart;

function* handleProductAddCartWatcher() {
  const { addedItem } = yield select(getCartStatefromStore);
  const { products } = yield select(getProductsListFromStore);

  const addedProduct = yield products.find((item) => item._id === addedItem);
  const { productCoverImage, productName } = addedProduct;
  const message = `${productName} added to cart😍`;
  yield put(globalSuccesMessengerWithImg(message, productCoverImage));
}

function* handleProductRemoveCartWatcher() {
  // const { cart } = yield select(getCartStatefromStore);
}

// Cart
export function* productCartWatcher() {
  yield takeLatest(ADD_PRODUCT_TO_CART, handleProductAddCartWatcher);
  yield takeLatest(REMOVE_PRODUCT_FROM_CART, handleProductRemoveCartWatcher);
}
