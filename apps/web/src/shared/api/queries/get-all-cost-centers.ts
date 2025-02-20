import { CostCenter } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_COSTS_CENTERS: TypedDocumentNode<{
    getAllCostCenters: CostCenter[]
}> = gql`
    query GET_ALL_COSTS_CENTERS {
        getAllCostCenters {
            id
            name
            description
            order
        }
    }
`
