import { gql } from '@apollo/client'

export const DELETE_BENEFICIARY = gql`
	mutation DeleteBeneficiary($deleteBeneficiaryId: String!) {
		deleteBeneficiary(id: $deleteBeneficiaryId)
	}
`
