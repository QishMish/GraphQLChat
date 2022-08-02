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
      users {
        id
        username
        profile_img
      }
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

export const SUBSCRIBE_TO_CHATROOM_NEW_MESSAGE_CREATION = gql`
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
export const SUBSCRIBE_TO_CHATROOM_MESSAGE_DELETION = gql`
  subscription Subscription($chatroomId: ID!) {
    onMessageDeleted(chatroomId: $chatroomId) {
      content
      id
    }
  }
`;
export const CREATE_CHATROOM = gql`
  mutation CreateChatroomGroup(
    $createChatroomGroupInput: CreateChatroomGroupInput!
  ) {
    createChatroomGroup(createChatroomGroupInput: $createChatroomGroupInput) {
      name
      type
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      status
      message
    }
  }
`;
