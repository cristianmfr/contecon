import { CostCenter } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const DELETE_COST_CENTER: TypedDocumentNode<{
    deleteCostCenter: CostCenter
    id: string
}> = gql`
    mutation DELETE_COST_CENTER($id: String!) {
        deleteCostCenter(id: $id) {
            id
        }
    }
`
