import { ApolloServer } from "apollo-server-express";
import express from "express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}${server.graphqlPath}`);
});
