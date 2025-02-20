import { Beneficiary } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_BENEFICIARIES: TypedDocumentNode<{
    getAllBeneficiaries: Beneficiary[]
}> = gql`
    query GET_ALL_BENEFICIARIES {
        getAllBeneficiaries {
            id
            name
            email
            document
            type
        }
    }
`
