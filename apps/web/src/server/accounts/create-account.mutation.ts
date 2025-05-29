import { gql } from '@apollo/client'

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($data: CreateAccountInput!) {
    createAccount(data: $data)
  }
`
