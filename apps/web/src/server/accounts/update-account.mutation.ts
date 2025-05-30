import { gql } from '@apollo/client'

export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($data: UpdateAccountInput!) {
		updateAccount(data: $data)
	}
`
