import { TypedDocumentNode, gql } from '@apollo/client'
import { Center } from '@contecon/graphql/lib/graphql'

export const CENTERS: TypedDocumentNode<
	{
		centers: {
			items: Center[]
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
	query Centers($query: QueryPaginationInput) {
		centers(query: $query) {
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
