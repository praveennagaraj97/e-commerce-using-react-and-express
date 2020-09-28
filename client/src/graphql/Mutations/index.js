const { gql } = require("@apollo/client");

export const SEND_MESSAGE = gql`
  mutation($message: String!) {
    sendMessage(to: "5f6f929a72cc0796e4115075", message: $message) {
      chats {
        _id
        message
      }
      sender {
        name
      }
      reciever {
        name
      }
    }
  }
`;
