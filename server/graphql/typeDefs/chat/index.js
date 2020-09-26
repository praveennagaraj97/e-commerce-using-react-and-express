import { gql } from "apollo-server-express";

const ChatTypeDefs = gql`
  extend type Query {
    testChat: String
  }

  extend type Mutation {
    sendMessage(to: ID!, message: String!): Message!
  }

  type Message {
    from: ID!
    to: ID!
    message: String!
  }
`;

export default ChatTypeDefs;
