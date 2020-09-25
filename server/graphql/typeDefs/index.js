import { gql } from "apollo-server-express";

import UserTypeDefs from "./user";
import ProductTypeDefs from "./products";

const RootSchema = gql`
  scalar BigInt

  type Query {
    "This **Query** Provides details about developer"
    aboutDeveloper: AboutMe
  }

  type Mutation {
    _rootMutation(name: String): String
  }

  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }
`;

const typeDefs = [RootSchema, UserTypeDefs, ProductTypeDefs];

export default typeDefs;
