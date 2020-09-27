import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      _id
      categoryName
      categoryIcon
    }
  }
`;

export const GET_CHAT_HISTORY = gql`
  query {
    getMyChats(withWhom: "5f70720142afdd4c8c5c09e5") {
      message
      chats {
        _id
        from
        to
        message
        at
      }
    }
  }
`;
