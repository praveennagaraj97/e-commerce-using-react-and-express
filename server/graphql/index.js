import { ApolloServer, PubSub } from "apollo-server-express";
import Category from "../model/categoryModel";
import { Product } from "../model/productModel";
import { User } from "../model/UserModel";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: { Category, Product, User, pubsub },
  tracing: true,
});

export default apolloServer;
