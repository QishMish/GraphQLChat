import React from 'react'
import { gql, useMutation } from '@apollo/client';


const SIGN_UP_USER = gql`
    mutation Mutation($signUpUserInput: SignUpUserInput!) {
        signUpUser(signUpUserInput: $signUpUserInput) {
            status
            token
        }
    }
`;

const useSignUp = () => {

const [signUp, { data, loading, error }] = useMutation(SIGN_UP_USER);

  return [signUp, { data, loading, error }]
}

export default useSignUp