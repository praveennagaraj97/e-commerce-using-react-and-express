const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }

  type Query {
    aboutDeveloper: AboutMe!
  }
`;
