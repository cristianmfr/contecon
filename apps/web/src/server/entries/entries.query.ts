import { TypedDocumentNode, gql } from '@apollo/client'
import { Entry } from '@contecon/graphql/lib/graphql'

export const ENTRIES: TypedDocumentNode<
	{
		entries: {
			items: Entry[]
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
	query Entries($query: QueryPaginationInput) {
		entries(query: $query) {
			items {
				id
				type
				totalValue
				status
				receiveFrom
				paymentDate
				offsetDate
				dueDate
				description
				beneficiary {
					id
					name
				}
				category {
					id
					name
				}
				account {
					id
					name
				}
				createdAt
				updatedAt
			}
		}
	}
`
