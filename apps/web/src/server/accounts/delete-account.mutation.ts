import { gql } from '@apollo/client'

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($deleteAccountId: String!) {
    deleteAccount(id: $deleteAccountId)
  }
`
