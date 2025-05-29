import { gql } from '@apollo/client'

export const CREATE_ENTRY = gql`
  mutation CreateEntry($data: CreateEntryInput!) {
    createEntry(data: $data)
  }
`
