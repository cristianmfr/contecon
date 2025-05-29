import { TypedDocumentNode, gql } from '@apollo/client'
import { Entry } from '@contecon/graphql/lib/graphql'

export const ENTRY: TypedDocumentNode<{
  entry: Entry
}> = gql`
  query Entry($entryId: String!) {
    entry(id: $entryId) {
      id
      description
      dueDate
      offsetDate
      paymentDate
      receiveFrom
      status
      totalValue
      type
      createdAt
      updatedAt
      center {
        id
        name
      }
      category {
        id
        name
      }
      beneficiary {
        id
        name
      }
      account {
        id
        name
      }
    }
  }
`
