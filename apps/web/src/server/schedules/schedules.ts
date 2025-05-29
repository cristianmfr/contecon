import { gql } from '@apollo/client'
import { TypedDocumentNode } from '@apollo/client'
import { Schedule } from '@contecon/graphql/lib/graphql'

export const SCHEDULES: TypedDocumentNode<{
  schedules: Schedule[]
}> = gql`
  query Schedules {
    schedules {
      id
      name
      description
      startDate
      endDate
      reminder
      reminderDaysBefore
      identifierColor
      isActive
      type
      createdAt
      updatedAt
    }
  }
`
