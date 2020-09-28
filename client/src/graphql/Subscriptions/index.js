import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messenger(userId: "5f70720142afdd4c8c5c09e5") {
      chats {
        _id
        message
        from
      }
    }
  }
`;
