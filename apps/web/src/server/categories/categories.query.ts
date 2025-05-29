import { TypedDocumentNode, gql } from '@apollo/client'
import { Category } from '@contecon/graphql/lib/graphql'

export const CATEGORIES: TypedDocumentNode<
  {
    categories: {
      items: Category[]
      total: number
    }
  },
  {
    query?: {
      search?: string
      skip?: number
      take?: number
    }
  }
> = gql`
  query Categories($query: QueryPaginationInput) {
    categories(query: $query) {
      items {
        id
        name
        description
        isActive
        createdAt
        updatedAt
      }
      total
    }
  }
`
