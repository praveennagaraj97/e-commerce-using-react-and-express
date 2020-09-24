import { ApolloServer } from "apollo-server-express";
import Category from "../model/categoryModel";
import { Product } from "../model/productModel";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: { Category, Product },
});

export default apolloServer;
