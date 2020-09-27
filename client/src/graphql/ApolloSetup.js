import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { useCookies } from "../utils/useCookies";
import { useSessionStorage } from "../utils/useSessionStorage";

import { COOKIE_NAMES } from "../constants";

const { AUTH_TOKEN } = COOKIE_NAMES;
const { getCookie } = useCookies;
const { getSessionItem } = useSessionStorage;

const cache = new InMemoryCache({});

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://lexa-api-v1.herokuapp.com/graphql"
      : "http://localhost:8080/graphql",
});

const authTokenFromCookie = () => getCookie(AUTH_TOKEN);
const authTokenFromSession = () => getSessionItem(AUTH_TOKEN);

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        authTokenFromCookie() || authTokenFromSession()
      }`,
    },
  };
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});
