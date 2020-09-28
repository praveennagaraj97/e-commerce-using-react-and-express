import {
  ApolloServer,
  AuthenticationError,
  PubSub,
} from "apollo-server-express";
import Category from "../model/categoryModel";
import { Product } from "../model/productModel";
import Chat from "../model/chatModel";
import { User } from "../model/UserModel";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { authCheck } from "./middleware";

const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  subscriptions: {
    onConnect: () => {
      // console.log(authorization);

      // const { error, user } = await authCheck(null, User, authorization);
      // if (error) return new AuthenticationError(error);
      console.log("websocket Connected!");
      // return user;
    },
    onDisconnect: () => console.log("ws connection closed"),
  },
  context: ({ req, res }) => ({
    req,
    res,
    Category,
    Product,
    User,
    Chat,
    pubsub,
  }),
  tracing: true,
});

export default apolloServer;
