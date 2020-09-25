import { gql } from "apollo-server-express";

export default gql`
  type AboutMe {
    name: String!
    age: Int!
    location: String!
  }

  type Category {
    _id: ID
    categoryName: String
    categoryIcon: String
  }

  type CategoryWithProducts {
    _id: ID
    categoryName: String
    categoryIcon: String
    products: [Product]
  }

  type Product {
    _id: ID
    productName: String
    productCoverImage: String
    categoryId: Category
    productPrice: Float
  }
`;
