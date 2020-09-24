import Axios from "axios";
import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * @param{G-App-Engine} : "https://lexa-api.uc.r.appspot.com/api/v1"
 * @param Heroku-Engine : "https://lexa-api-v1.herokuapp.com/api/v1"
 */

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://lexa-api-v1.herokuapp.com/graphql"
      : "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export const apiBaseEndpoint = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://lexa-api-v1.herokuapp.com/api/v1`
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
  getProductsDetailsForGrpIdsEndPoint,
  getProductDetailEndPoint,
  getListOfProductReviewsEndPoint,
  reviewFoundHelpfulEndpoint,
} from "./productEndpoints";

export {
  addMobileReview,
  addComputerReview,
  addElectronicsReview,
} from "./addon";
