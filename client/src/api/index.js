import Axios from "axios";
// lexa-api.uc.r.appspot.com/api/v1
export const apiBaseEndpoint = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://localhost:8080/api/v1"
      : `http://localhost:8080/api/v1`,
});

export {
  loginEndPoint as UserLogger,
  signUpEndPoint as UserSigner,
  authAccreditationEndPoint as AuthAccreditation,
  forgotPasswordEndpoint as forgotPassword,
  resetPasswordEndpoint as resetPassword,
  getUserEndpoint as getUser,
  updateUserPasswordEndpoint as updateUserPassword,
} from "./userAuthAPI";

export {
  getAllCategoriesEndpoint,
  getProductsBasedOnQuery,
  getProductsDetailsInCartEndPoint,
  getProductDetailEndPoint,
} from "./productEndpoints";
