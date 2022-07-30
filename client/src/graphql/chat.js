import { gql } from "@apollo/client";

export const FETCH_CHATROOMS = gql`
  query fetchChatrooms {
    fetchChatrooms {
      id
      name
      type
      creator_id
      users {
        username
        email
        id
      }
    }
  }
`;

export const FETCH_CHATROOM_MESSAGES = gql`
  query FetchChatroomMessages($chatroomId: ID!) {
    fetchChatroomMessages(chatroomId: $chatroomId) {
      id
      name
      type
      creator_id
      messages {
        id
        content
        createdAt
        author {
          id
          email
          username
          verified
          isActive
        }
        chatroom_id
      }
    }
  }
`;

export const SEND_NEW_MESSAGE = gql`
  mutation SendNewMessage(
    $chatroomId: ID!
    $newMessageInput: NewMessageInput!
  ) {
    sendNewMessage(
      chatroomId: $chatroomId
      newMessageInput: $newMessageInput
    ) {
      content
      id
      chatroom_id
      createdAt
    }
  }
`;
