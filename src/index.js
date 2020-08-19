import { GraphQLServer, PubSub } from "graphql-yoga";
import { resolve } from "path";

import db from "./db/db";
import Query from "./resolvers/Query";
import Product from "./resolvers/Product";
import Category from "./resolvers/Category";

import Mutation from "./resolvers/Mutation";

import Subscription from "./resolvers/Subscription";

const server = new GraphQLServer({
  typeDefs: resolve("src", "schema.graphql"),
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
    Subscription,
  },
  context: { db, pubsub: new PubSub() },
});

server.start(() => {
  console.log("GraphQL server started");
});
