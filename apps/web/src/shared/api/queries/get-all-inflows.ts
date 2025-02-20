import { Inflow } from '@/shared/graphql/graphql'
import { gql, TypedDocumentNode } from '@apollo/client'

export const GET_ALL_INFLOWS: TypedDocumentNode<{
    getAllInflows: Inflow[]
}> = gql`
    query GetAllInflows {
        getAllInflows {
            id
            name
            description
        }
    }
`
