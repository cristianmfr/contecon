import { CostCenterGroup, CreateCostCenterGroupInput } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const CREATE_COST_CENTER_GROUP: TypedDocumentNode<{
    createCostCenterGroup: CostCenterGroup
    data: CreateCostCenterGroupInput
}> = gql`
    mutation CREATE_COST_CENTER_GROUP($data: CreateCostCenterGroupInput!) {
        createCostCenterGroup(data: $data) {
            id
        }
    }
`
