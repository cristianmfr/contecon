import { CostCenter, CreateCostCenterInput } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const CREATE_COST_CENTER: TypedDocumentNode<{
    createCostCenter: CostCenter
    data: CreateCostCenterInput
}> = gql`
    mutation CreateCostCenter($data: CreateCostCenterInput!) {
        createCostCenter(data: $data) {
            id
        }
    }
`
