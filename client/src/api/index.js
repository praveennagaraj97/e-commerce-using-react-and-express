export {
  loginEndPoint as UserLogger,
  signUpEndPoint as UserSigner,
} from "./userAuthAPI";

const API_URL_LOCAL = "http://localhost:8080";
const API_URL_LIVE = "https://lexa-api.uc.r.appspot.com";

if (process.env.NODE_ENV === "development") {
  export { API_URL_LOCAL as API };
} else if (process.env.NODE_ENV === "production") {
  export { API_URL_LIVE as API };
}
