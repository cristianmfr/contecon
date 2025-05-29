import { TypedDocumentNode, gql } from '@apollo/client'
import { Beneficiary } from '@contecon/graphql/lib/graphql'

export const BENEFICIARY: TypedDocumentNode<{
  beneficiary: Beneficiary
}> = gql`
  query Beneficiary($id: String!) {
    beneficiary(id: $id) {
      id
      name
      email
      phone
      documentType
      document
      type
      birthdate
      createdAt
      updatedAt
    }
  }
`
