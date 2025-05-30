import { gql } from '@apollo/client'

export const UPDATE_BENEFICIARY = gql`
	mutation UpdateBeneficiary($data: UpdateBeneficiaryInput!) {
		updateBeneficiary(data: $data)
	}
`
