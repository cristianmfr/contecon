import { TypedDocumentNode, gql } from '@apollo/client'
import { Account } from '@contecon/graphql/lib/graphql'

export const ACCOUNT: TypedDocumentNode<{
  account: Account
}> = gql`
  query Account($accountId: String!) {
    account(id: $accountId) {
      id
      name
      description
      credit
      balance
      bank
      agency
      number
      type
      createdAt
      updatedAt
    }
  }
`
