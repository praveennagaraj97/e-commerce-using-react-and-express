import { gql } from "apollo-server-express";

const ChatTypeDefs = gql`
  extend type Query {
    testChat: String
  }

  extend type Mutation {
    sendMessage(user: String!, message: String!): Message!
  }

  type Message {
    user: String!
    message: String!
  }
`;

export default ChatTypeDefs;
