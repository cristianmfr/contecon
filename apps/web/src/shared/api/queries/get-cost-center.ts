import { CostCenterGroup } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_COST_CENTER_GROUP: TypedDocumentNode<{
    getCostCenterGroupById: CostCenterGroup
    id: string
}> = gql`
    query GET_COST_CENTER_GROUP($getCostCenterGroupByIdId: String!) {
        getCostCenterGroupById(id: $getCostCenterGroupByIdId) {
            id
            name
            description
            costCenter {
                id
                name
                description
            }
        }
    }
`
