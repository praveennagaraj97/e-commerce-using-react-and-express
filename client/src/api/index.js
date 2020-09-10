import Axios from "axios";
export const API_BASE_URL_LOCAL = "http://localhost:8080";
export const API_BASE_URL_LIVE = "https://lexa-api.uc.r.appspot.com";

export const apiBaseEndpoint = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://lexa-api.uc.r.appspot.com/api/v1"
      : `http://localhost:8080/api/v1`,
});

export {
  loginEndPoint as UserLogger,
  signUpEndPoint as UserSigner,
  authAccreditationEndPoint as AuthAccreditation,
  forgotPasswordEndpoint as forgotPassword,
} from "./userAuthAPI";

export {
  getAllCategoriesEndpoint,
  getProductsBasedOnQuery,
  getProductsDetailsInCartEndPoint,
  getProductDetailEndPoint,
} from "./productEndpoints";
