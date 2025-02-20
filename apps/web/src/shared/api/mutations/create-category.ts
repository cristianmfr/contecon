import { Category, CreateCategoryInput } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const CREATE_CATEGORY: TypedDocumentNode<{
    createCategory: Category
    data: CreateCategoryInput
}> = gql`
    mutation CreateCategory($data: CreateCategoryInput!) {
        createCategory(data: $data) {
            id
        }
    }
`
