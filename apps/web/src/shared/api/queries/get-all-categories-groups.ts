import { CategoryGroup } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_CATEGORIES_GROUPS: TypedDocumentNode<{
    getAllCategoriesGroups: CategoryGroup[]
}> = gql`
    query GET_ALL_CATEGORIES_GROUPS {
        getAllCategories {
            id
            name
            description
            order
        }
    }
`
