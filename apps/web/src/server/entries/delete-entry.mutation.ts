import { gql } from '@apollo/client'

export const DELETE_ENTRY = gql`
  mutation DeleteEntry($deleteEntryId: String!) {
    deleteEntry(id: $deleteEntryId)
  }
`
