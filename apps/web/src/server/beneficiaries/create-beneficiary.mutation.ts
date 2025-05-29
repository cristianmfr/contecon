import { gql } from '@apollo/client'

export const CREATE_BENEFICIARY = gql`
  mutation CreateBeneficiary($data: CreateBeneficiaryInput!) {
    createBeneficiary(data: $data)
  }
`
