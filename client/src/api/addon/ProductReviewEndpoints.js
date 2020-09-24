import { apiBaseEndpoint } from "..";
import { useCookies } from "../../utils/useCookies";
import { useSessionStorage } from "../../utils/useSessionStorage";
import { COOKIE_NAMES } from "../../constants";

const { AUTH_TOKEN } = COOKIE_NAMES;
const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

export const addMobileReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addMobileReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};

export const addComputerReview = async (data) => {
  return await apiBaseEndpoint.post("/product_review/addComputerReview", data, {
    headers: {
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  });
};
