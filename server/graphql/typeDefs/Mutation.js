import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    getProductBasedOnCategory(name: String): [Product]
  }
`;
