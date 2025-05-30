import { TypedDocumentNode, gql } from '@apollo/client'
import { Account } from '@contecon/graphql/lib/graphql'

export const ACCOUNTS: TypedDocumentNode<
	{
		accounts: {
			items: Account[]
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
	query Accounts($query: QueryPaginationInput) {
		accounts(query: $query) {
			items {
				id
				name
				description
				credit
				number
				type
				bank
				balance
				agency
				createdAt
				updatedAt
			}
			total
		}
	}
`
