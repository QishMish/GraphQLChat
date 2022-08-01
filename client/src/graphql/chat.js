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
        profile_img
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
          profile_img
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
    sendNewMessage(chatroomId: $chatroomId, newMessageInput: $newMessageInput) {
      content
      id
      chatroom_id
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      email
      username
      profile_img
    }
  }
`;

export const SUBSCRIBE_TO_CHATROOM = gql`
  subscription OnNewMessageCreated($chatroomId: ID!) {
    onNewMessageCreated(chatroomId: $chatroomId) {
      id
      content
      author {
        id
        username
      }
      createdAt
    }
  }
`;
