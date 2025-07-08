import { TypedDocumentNode, gql } from '@apollo/client'
import {
	Account,
	Beneficiary,
	Category,
	Center,
	Entry,
	RecurringBilling,
	Schedule,
} from '@contecon/graphql/lib/graphql'

/* CENTERS */

export const CENTER: TypedDocumentNode<{
	center: Center
}> = gql`
	query Center($centerId: String!) {
		center(id: $centerId) {
			id
			name
			description
			isActive
			createdAt
			updatedAt
		}
	}
`

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

/* CATEGORIES */

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

/* ENTRIES */

export const ENTRY: TypedDocumentNode<{
	entry: Entry
}> = gql`
	query Entry($entryId: String!) {
		entry(id: $entryId) {
			id
			description
			dueDate
			offsetDate
			paymentDate
			receiveFrom
			status
			totalValue
			type
			createdAt
			updatedAt
			center {
				id
				name
			}
			category {
				id
				name
			}
			beneficiary {
				id
				name
			}
			account {
				id
				name
			}
		}
	}
`

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

/* ACCOUNTS */

export const ACCOUNT: TypedDocumentNode<{
	account: Account
}> = gql`
	query Account($accountId: String!) {
		account(id: $accountId) {
			id
			name
			description
			credit
			balance
			bank
			agency
			number
			type
			createdAt
			updatedAt
		}
	}
`

export const ACCOUNTS: TypedDocumentNode<{
	accounts: {
		items: Account[]
		total: number
	}
}> = gql`
	query Accounts($query: QueryPaginationInput) {
		accounts(query: $query) {
			items {
				id
				name
				description
				credit
				balance
				bank
				agency
				number
				type
				createdAt
				updatedAt
			}
			total
		}
	}
`

/* BENEFICIARIES */

export const BENEFICIARY: TypedDocumentNode<{
	beneficiary: Beneficiary
}> = gql`
	query Beneficiary($beneficiaryId: String!) {
		beneficiary(id: $beneficiaryId) {
			id
			name
			document
			email
			phone
		}
	}
`

export const BENEFICIARIES: TypedDocumentNode<{
	beneficiaries: {
		items: Beneficiary[]
		total: number
	}
}> = gql`
	query Beneficiaries($query: QueryPaginationInput) {
		beneficiaries(query: $query) {
			items {
				id
				name
				document
				email
				phone
				createdAt
				updatedAt
			}
			total
		}
	}
`

export const SCHEDULES: TypedDocumentNode<{
	schedules: Schedule[]
}> = gql`
	query Schedules {
		schedules {
			id
			name
			reminder
			reminderDaysBefore
			isActive
			identifierColor
			endDate
			startDate
			type
			description
			createdAt
			updatedAt
		}
	}
`

/* RECURRING BILLS */

export const RECURRING_BILL: TypedDocumentNode<{
	recurringBill: RecurringBilling
}> = gql`
	query RecurringBill($recurringBillId: String!) {
		recurringBill(id: $recurringBillId) {
			id
			name
			description
			dueDate
			offsetDate
			paymentDate
			receiveFrom
			status
			totalValue
			type
			createdAt
			updatedAt
		}
	}
`

export const RECURRING_BILLS: TypedDocumentNode<{
	recurringBills: {
		items: RecurringBilling[]
		total: number
	}
}> = gql`
	query RecurringBills($query: QueryPaginationInput) {
		recurringBills(query: $query) {
			id
			name
			description
			dueDate
			offsetDate
			paymentDate
			receiveFrom
			status
			totalValue
			type
			createdAt
			updatedAt
		}
		total
	}
`
