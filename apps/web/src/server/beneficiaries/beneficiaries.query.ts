import { TypedDocumentNode, gql } from '@apollo/client'
import { Beneficiary } from '@contecon/graphql/lib/graphql'

export const BENEFICIARIES: TypedDocumentNode<{
  beneficiaries: {
    items: Beneficiary[]
    total: number
  }
  query?: {
    search?: string
    skip?: number
    take?: number
  }
}> = gql`
  query Beneficiaries($query: QueryPaginationInput) {
    beneficiaries(query: $query) {
      items {
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
      total
    }
  }
`
