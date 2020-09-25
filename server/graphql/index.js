import { ApolloServer, PubSub } from "apollo-server-express";
import Category from "../model/categoryModel";
import { Product } from "../model/productModel";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: { Category, Product, pubsub },
});

export default apolloServer;
