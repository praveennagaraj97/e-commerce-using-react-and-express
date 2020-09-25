import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({});

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://lexa-api-v1.herokuapp.com/graphql"
      : "http://localhost:8080/graphql",
  cache,
});
