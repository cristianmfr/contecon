import { Category } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_CATEGORIES: TypedDocumentNode<{
    getAllCategories: Category[]
}> = gql`
    query GET_ALL_CATEGORIES {
        getAllCategories {
            id
            name
            description
            order
        }
    }
`
