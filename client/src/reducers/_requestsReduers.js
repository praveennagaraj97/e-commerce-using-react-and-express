import { RE_OCCURING_REQUESTS } from "../constants";

const { RE_OCCURING_PRODUCT_DETAIL } = RE_OCCURING_REQUESTS;

const requestReducer = (state = {}, action) => {
  switch (action.type) {
    case RE_OCCURING_PRODUCT_DETAIL:
      if (state.productDetailRequests) {
        Object.assign(state.productDetailRequests, {
          [action.request.id]: action.request.data,
        });
      } else {
        state.productDetailRequests = {
          [action.request.id]: action.request.data,
        };
      }
      return { ...state };

    default:
      return state;
  }
};

export default requestReducer;
