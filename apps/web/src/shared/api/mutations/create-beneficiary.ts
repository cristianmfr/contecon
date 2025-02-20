import { Beneficiary, CreateBeneficiaryInput } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const CREATE_BENEFICIARY: TypedDocumentNode<{
    createBeneficiary: Beneficiary
    data: CreateBeneficiaryInput
}> = gql`
    mutation CREATE_BENEFICIARY($data: CreateBeneficiaryInput!) {
        createBeneficiary(data: $data) {
            id
        }
    }
`
