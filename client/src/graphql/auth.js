import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation SignUpUser($signUpUserInput: SignUpUserInput!) {
    signUpUser(signUpUserInput: $signUpUserInput) {
      status
      access_token
      refresh_token
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation SignInUser($signInUserInput: SignInUserInput!) {
    signInUser(signInUserInput: $signInUserInput) {
      status
      access_token
      refresh_token
    }
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      status
      access_token
    }
  }
`;
