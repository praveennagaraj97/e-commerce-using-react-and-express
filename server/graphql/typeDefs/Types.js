import { gql } from "apollo-server-express";

export default gql`
  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }

  scalar BigInt

  type Category {
    _id: ID!
    categoryName: String!
    categoryIcon: String!
  }

  type CategoryWithProducts {
    category: Category!
    products: [Product!]
  }

  type Product {
    _id: ID!
    productName: String!
    productCoverImage: String!
    categoryId: Category!
    productPrice: Float!
  }

  type Chat {
    _id: ID!
    title: String!
    users: [User!]!
    messages: [String]
  }
`;
