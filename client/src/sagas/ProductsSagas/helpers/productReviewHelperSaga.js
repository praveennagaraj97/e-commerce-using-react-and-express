import { call, put, delay } from "redux-saga/effects";

import { globalSuccesMessenger } from "../../../actions";
import { addMobileReview } from "../../../api";

export function* productReviewForMobilesWorker(productId, details) {
  try {
    const { data } = yield call(addMobileReview, { ...details, productId });
    console.log(data);
    yield put(globalSuccesMessenger("Thanks for feedback."));
    yield delay(3200);
    yield put(globalSuccesMessenger(null));
  } catch (error) {
    console.log(error);
  }
}
