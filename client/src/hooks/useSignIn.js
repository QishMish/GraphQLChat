import React from 'react'
import { gql, useMutation } from '@apollo/client';


const SIGN_IN_USER = gql`
    mutation Mutation($signInUserInput: SignInUserInput!) {
        signInUser(signInUserInput: $signInUserInput) {
            status
            token
        }
    }
`;

const useSignIn = () => {

const [signUp, { data, loading, error }] = useMutation(SIGN_IN_USER);

  return [signUp, { data, loading, error }]
}

export default useSignIn