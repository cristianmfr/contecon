import { TypedDocumentNode, gql } from '@apollo/client'
import { Center } from '@contecon/graphql/lib/graphql'

export const CENTER: TypedDocumentNode<{
  center: Center
}> = gql`
  query Center($centerId: String!) {
    center(id: $centerId) {
      id
      name
      description
      isActive
      createdAt
      updatedAt
    }
  }
`
