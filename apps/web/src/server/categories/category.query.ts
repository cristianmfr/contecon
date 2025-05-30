import { TypedDocumentNode, gql } from '@apollo/client'
import { Category } from '@contecon/graphql/lib/graphql'

export const CATEGORY: TypedDocumentNode<{
	category: Category
}> = gql`
	query Category($categoryId: String!) {
		category(id: $categoryId) {
			id
			name
			description
			isActive
			createdAt
			updatedAt
		}
	}
`
