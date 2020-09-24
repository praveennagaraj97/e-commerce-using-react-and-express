const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }

  type Category {
    _id: ID!
    categoryName: String!
    categoryIcon: String!
  }

  type Product {
    _id: ID!
    productName: String!
    productCoverImage: String!
    categoryId: Category!
    productPrice: Float!
  }

  type Query {
    aboutDeveloper: AboutMe!
    getAllCategories: [Category!]
    getAllProducts: [Product]
  }
`;
