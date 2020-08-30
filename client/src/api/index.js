export const API_BASE_URL_LOCAL = "http://localhost:8080";
export const API_BASE_URL_LIVE = "https://lexa-api.uc.r.appspot.com";

export {
  loginEndPoint as UserLogger,
  signUpEndPoint as UserSigner,
  authAccreditationEndPoint as AuthAccreditation,
} from "./userAuthAPI";

export {
  getAllCategoriesEndpoint,
  getProductsBasedOnQuery,
} from "./productEndpoints";
