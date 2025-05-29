import { gql } from '@apollo/client'

export const RESET_USER_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`
