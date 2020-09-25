import { gql } from "apollo-server-express";

export default gql`
  type Query {
    "This Query Provides details about developer"
    aboutDeveloper: AboutMe

    "This Query Provides List of all categories with Icon"
    getAllCategories: [Category]

    "This Query will get list of all categories along with the products associated with it."
    getAllCategoriesWithItsProduct: [CategoryWithProducts]

    "This Query provides all products along with it's Category Detail"
    getAllProducts: [Product]
  }
`;
