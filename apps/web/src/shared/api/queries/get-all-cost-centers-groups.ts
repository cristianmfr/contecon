import { CostCenterGroup } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_COSTS_CENTERS_GROUPS: TypedDocumentNode<{
    getAllCostCentersGroups: CostCenterGroup[]
}> = gql`
    query GET_ALL_COSTS_CENTERS_GROUPS {
        getAllCostCentersGroups {
            id
            name
            description
            order
        }
    }
`
