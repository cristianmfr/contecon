import { gql } from '@apollo/client'

export const DELETE_CENTER = gql`
  mutation DeleteCenter($deleteCenterId: String!) {
    deleteCenter(id: $deleteCenterId)
  }
`
